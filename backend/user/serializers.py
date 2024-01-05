from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "username",
            "email",
            "is_staff",
            "is_active",
            "is_verified",
            "created_at",
            "updated_at",
            # "photo",
            # "exchange",
        ]
        read_only_fields = [
            "id",
            "email",
            "is_staff",
            "is_active",
            "is_verified",
            "created_at",
            "updated_at",
        ]


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    def create(self, validated_data):
        user = get_user_model().objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
            is_verified=validated_data["is_verified"] if "is_verified" in validated_data else False,
        )

        user.set_password(validated_data["password"])
        user.save()

        return user

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"ERROR": "Password fields didn't match"})

        return attrs

    def validate_username(self, value):
        if len(value.split(' ')) > 1:
            raise serializers.ValidationError({"ERROR": "Username must be without spaces"})

        return value

    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "username",
            "email",
            "password",
            "password2",
            "is_staff",
            "is_active",
            "is_verified",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "is_staff",
            "is_active",
            "is_verified",
            "created_at",
            "updated_at",
        ]


class UserListRegisterSerializer(serializers.ListSerializer):
    child = UserRegisterSerializer()


class EmailVerifySerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=255)

    class Meta:
        model = get_user_model()
        fields = ["token"]


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=68, write_only=True)

    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = get_user_model().objects.get(username=obj["username"])
        tokens = user.tokens()

        return {"refresh": tokens["refresh"], "access": tokens["access"]}

    class Meta:
        model = get_user_model()
        fields = ["username", "password", "tokens"]

    def validate(self, attrs):
        user_obj = (
                get_user_model().objects.filter(email=attrs.get("username")).first()
                or get_user_model().objects.filter(username=attrs.get("username")).first()
        )
        credentials = {"username": "", "password": attrs.get("password")}

        if user_obj:
            credentials["username"] = user_obj.username

        user = authenticate(username=credentials["username"], password=credentials["password"])
        if not user:
            raise AuthenticationFailed("Invalid credentials, try again.")
        if not user.is_active:
            raise AuthenticationFailed("Account disabled, contact admin.")

        return {
            "email": user.email,
            "username": user.username,
            "tokens": user.tokens,
        }


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {"ERROR": "Token is expired or invalid"}

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail("ERROR")


class ChangePasswordSerializer(serializers.Serializer):
    model = get_user_model()
    old_password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    password2 = serializers.CharField(min_length=6, max_length=68, write_only=True)

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"ERROR": "Password fields didn't match."}, 403
            )

        password = attrs.get("password")
        user = self.context["request"].user
        user.set_password(password)
        user.save()

        return attrs

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                {"ERROR": "Old password is not correct."}, 403
            )
        return value


class ChangeEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

    class Meta:
        model = get_user_model()
        fields = ["email"]


class RequestPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ["email"]


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")

            id = force_str(urlsafe_base64_decode(uidb64))
            user = get_user_model().objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed(
                    {"ERROR": "The reset link is invalid"}, 401
                )

            user.set_password(password)
            user.save()

            return user
        except Exception:
            raise AuthenticationFailed(
                {"ERROR": "The reset link is invalid"}, 401
            )

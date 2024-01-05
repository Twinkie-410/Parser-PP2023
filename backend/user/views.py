import logging
import jwt
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     ListAPIView,
                                     UpdateAPIView,
                                     RetrieveAPIView,
                                     CreateAPIView,
                                     GenericAPIView)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from config import settings
from mailings.change_email import change_email
from mailings.email_verification import send_verify_email
from mailings.reset_password import send_reset_password
from user.serializers import UserSerializer, UserListRegisterSerializer, ChangePasswordSerializer, LoginSerializer, \
    LogoutSerializer, EmailVerifySerializer, RequestPasswordResetSerializer, SetNewPasswordSerializer, \
    ChangeEmailSerializer, UserRegisterSerializer


class UserListAPIView(ListAPIView):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()


class UserDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()
    lookup_field = "username"


class UserRegisterAPIView(CreateAPIView):
    permission_classes = []
    serializer_class = UserRegisterSerializer
    queryset = get_user_model().objects.all()

    def post(self, request, *args, **kwargs):
        users = request.data
        serializer = self.serializer_class(data=users)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        # for i, user in enumerate(users):
        #     send_verify_email(user_data[i], request)
        send_verify_email(user_data, request)

        return Response(user_data, status=status.HTTP_201_CREATED)


class EmailVerifyAPIView(APIView):
    """
    Validates the token that came in the mail after registration.
    """

    serializer_class = EmailVerifySerializer

    @swagger_auto_schema(manual_parameters=[openapi.Parameter(
        "token",
        in_=openapi.IN_QUERY,
        description="Access token",
        type=openapi.TYPE_STRING,
    )])
    def get(self, request):
        token = request.GET.get("token")

        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=settings.SIMPLE_JWT["ALGORITHM"]
            )
            user = get_user_model().objects.get(id=payload["user_id"])

            if not user.is_verified:
                user.is_verified = True
                user.save()

                return Response({"OK": "Successfully activated"},
                                status=status.HTTP_200_OK)

            return Response({"OK": "The account is already verified"})

        except jwt.ExpiredSignatureError as _:
            return Response({"ERROR": "Activation expired"},
                            status=status.HTTP_400_BAD_REQUEST)

        except jwt.exceptions.DecodeError as _:
            return Response({"ERROR": "Invalid token"},
                            status=status.HTTP_400_BAD_REQUEST)

        except Exception as error:
            logger = logging.getLogger(__name__)
            logger.error(error)


class LoginAPIView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        """
        Login.
        """
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.data
        username = user_data["username"]

        # try:
        user = get_user_model().objects.get(username=username)
        if not user.is_verified:
            send_verify_email({"email": user.email}, request)

            return Response(
                {"OK": f"Hello, {user}! We sent you a confirmation email"},
                status=status.HTTP_200_OK,
            )

        # except Exception as error:
        #     logger = logging.getLogger(__name__)
        #     logger.error(error)
        #     return Response(
        #         {"ERROR": "Server error"},
        #         status=status.HTTP_500_INTERNAL_SERVER_ERROR
        #     )

        return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutAPIView(GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Adds a valid refresh token to the blacklist.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"OK": "Bye!"}, status=status.HTTP_204_NO_CONTENT)


class ChangeEmailAPIView(GenericAPIView):
    """
    Changing email for auth users in update profile page.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ChangeEmailSerializer

    def post(self, request):
        user = request.user
        new_email = request.data["email"]

        if user.email:
            change_email(user.email, new_email, request)

        return Response({"OK": "Check new email to confirm email change"},
                        status=status.HTTP_200_OK)


# class ChangeEmailVerifyAPIView(GenericAPIView):
#     """
#     Verify new email address from email
#     """
#
#     serializer_class = EmailVerifySerializer


class ChangePasswordAPIView(GenericAPIView):
    """
    Changing password for auth users in update profile page.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer
    model = get_user_model()

    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            return Response(
                {"OK": "Password updated successfully"},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetAPIView(GenericAPIView):
    """
    Send password reset link with tokens to email if the user has
    forgotten the login password.
    """

    permission_classes = [AllowAny]
    serializer_class = RequestPasswordResetSerializer

    def post(self, request):
        email = request.data.get("email", "")

        if get_user_model().objects.filter(email=email).exists():
            user = get_user_model().objects.get(email=email)
            send_reset_password(user, request)

            return Response(
                {"OK": "We have sent you a link to reset your password"},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"ERROR": "This email isn't registered"},
            status=status.HTTP_404_NOT_FOUND
        )


class PasswordTokenCheckAPI(GenericAPIView):
    """
    Token and uid verification.
    """

    permission_classes = [AllowAny]
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = get_user_model().objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise DjangoUnicodeDecodeError

            return Response({
                "OK": True, "message": "Valid", "uidb64": uidb64, "token": token
            })

        except DjangoUnicodeDecodeError:
            return Response(
                {"ERROR": "Token is not valid, please request a new one"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class SetNewPasswordAPIView(GenericAPIView):
    """
    Patch new password from email (needs uidb64 and token).
    """

    permission_classes = [AllowAny]
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            return Response(
                {"OK": True, "message": "Password reset success"},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

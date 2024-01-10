from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.utils import model_meta

from profiles.models import Profiles
from user.serializers import UserSerializer, UserRegisterSerializer


class ProfilesSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profiles
        fields = ["first_name", "last_name", "phone", "city", "favorite_genre", "other_contacts", "user"]

    def update(self, instance, validated_data):
        if "user" in validated_data:
            nested_serializer = self.fields["user"]
            nested_instance = instance.user
            nested_data = validated_data.pop("user")

            nested_serializer.update(nested_instance, nested_data)

        info = model_meta.get_field_info(instance)
        m2m_fields = []
        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                m2m_fields.append((attr, value))
            else:
                setattr(instance, attr, value)

        instance.save()

        for attr, value in m2m_fields:
            field = getattr(instance, attr)
            field.set(value)

        return instance


class ProfilesRegisterSerializer(serializers.ModelSerializer):
    user = UserRegisterSerializer()

    class Meta:
        model = Profiles
        fields = ["first_name", "last_name", "phone", "city", "favorite_genre", "other_contacts", "user"]

    def create(self, validated_data):
        user = self.fields["user"].create(validated_data.pop("user"))
        profile = Profiles.objects.create(user=user, **validated_data)

        return profile

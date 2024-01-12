from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from mailings.email_verification import send_verify_email
from profiles.models import Profiles
from profiles.serializers import ProfilesSerializer, ProfilesRegisterSerializer
from rest_framework.response import Response


class ProfileListAPIView(ListAPIView):
    serializer_class = ProfilesSerializer
    queryset = Profiles.objects.all()


class UserProfileAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfilesSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        profile = Profiles.objects.get(user=user)
        profile_data = self.serializer_class(profile)
        return Response(profile_data.data)


class ProfileDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ProfilesSerializer
    queryset = Profiles.objects.all()
    lookup_field = "user__username"

    def delete(self, request, *args, **kwargs):
        """Deletes user and his profile"""
        user = get_user_model().objects.get(username=kwargs["user__username"])
        user.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileRegisterAPIView(CreateAPIView):
    permission_classes = []
    serializer_class = ProfilesRegisterSerializer
    queryset = Profiles.objects.all()

    def post(self, request, *args, **kwargs):
        profile = request.data
        serializer = self.serializer_class(data=profile)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        profile_data = serializer.data
        send_verify_email(profile_data["user"], request)

        return Response(profile_data, status=status.HTTP_201_CREATED)

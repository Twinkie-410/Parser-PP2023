from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     ListAPIView,
                                     UpdateAPIView,
                                     RetrieveAPIView)
from rest_framework.response import Response
from user.serializers import UserSerializer
from user.models import User


class UserListAPIView(ListAPIView):
    serializer_class = UserSerializer

from django.urls import path
from user.views import UserListAPIView
urlpatterns = [
    path("", UserListAPIView.as_view(), name="users"),
]
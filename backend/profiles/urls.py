from django.urls import path

from profiles.views import ProfileRegisterAPIView, ProfileListAPIView, ProfileDetailAPIView, UserProfileAPIView

urlpatterns = [
    path("my-profile/", UserProfileAPIView.as_view(), name="my-profile"),
    path("register/", ProfileRegisterAPIView.as_view(), name="register"),
    path("", ProfileListAPIView.as_view(), name="profiles"),
    path("<slug:user__username>", ProfileDetailAPIView.as_view(), name="profile-detail"),
]

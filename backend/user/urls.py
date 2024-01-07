from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView, TokenRefreshView

from user.views import UserListAPIView, UserRegisterAPIView, UserDetailAPIView, ChangePasswordAPIView, LoginAPIView, \
    LogoutAPIView, EmailVerifyAPIView, RequestPasswordResetAPIView, PasswordTokenCheckAPI, SetNewPasswordAPIView, \
    ChangeEmailAPIView

urlpatterns = [
    # Auth
    path("email-verify/", EmailVerifyAPIView.as_view(), name="email-verify"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),

    # CRUD
    path("register/", UserRegisterAPIView.as_view(), name="user-register"),
    path("", UserListAPIView.as_view(), name="users"),
    path("<slug:username>", UserDetailAPIView.as_view(), name="user-detail"),
    path("change-password/", ChangePasswordAPIView.as_view(), name="change-password"),
    # path("change-email/", ChangeEmailAPIView.as_view(), name="change-email"),

    # Reset password
    path("request-pass-reset/", RequestPasswordResetAPIView.as_view(), name="request-pass-reset"),
    path("password-reset/<uidb64>/<token>/", PasswordTokenCheckAPI.as_view(), name="password-reset-confirm"),
    path("password-reset-complete/", SetNewPasswordAPIView.as_view(), name="password-reset-complete"),

    # Tokens
    path("verify/", TokenVerifyView.as_view(), name="token-verify"),
    path("refresh/", TokenRefreshView.as_view(), name="token-refresh"),
]

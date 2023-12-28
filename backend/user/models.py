from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if username is None:
            raise TypeError("Users should have a username")

        if password is None:
            raise TypeError("Users should have a password")

        user = self.model(
            username=username,
            email=self.normalize_email(email).lower() if email else None,
            **extra_fields,
        )
        user.set_password(password)
        user.save()

    def create_superuser(self, username, password, **extra_fields):
        email = username + "@" + username + ".com"
        user = self.create_user(
            username,
            email,
            password,
            is_superuser=True,
            is_staff=True,
            is_verified=True,
        )

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # photo = ?
    # exchange = ?

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"

    def tokens(self):
        refresh = RefreshToken.for_user(self)

        return {"refresh": str(refresh), "access": str(refresh.access_token)}


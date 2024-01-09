from django.contrib.auth import get_user_model
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Profiles(models.Model):
    user = models.OneToOneField(get_user_model(), models.CASCADE)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    phone = PhoneNumberField(blank=True)
    city = models.CharField(max_length=255, blank=True)
    favorite_genre = models.CharField(max_length=255, blank=True)
    other_contacts = models.CharField(max_length=255, blank=True)
    # photo = ?

from django.contrib.auth import get_user_model
from django.db import models


class Exchange(models.Model):
    user = models.ForeignKey(get_user_model(), models.CASCADE)
    description = models.TextField(blank=True)
    price = models.PositiveIntegerField(default=0)
    # photos = ?
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

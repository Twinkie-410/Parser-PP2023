from django.db import models
from exchange.models import Exchange


class Book(models.Model):
    EXCELLENT = "EX"
    GOOD = "GD"
    MODERATELY = "MD"
    POOR = "PR"
    CONDITIONS = (
        (EXCELLENT, "Отличное"),
        (GOOD, "Хорошее"),
        (MODERATELY, "Среднее"),
        (POOR, "Плохое"),
    )
    title = models.CharField(max_length=255, blank=True)
    author = models.CharField(max_length=255, blank=True)
    genre = models.CharField(max_length=255, blank=True)
    condition = models.CharField(max_length=2, choices=CONDITIONS, default=EXCELLENT)
    writing_year = models.DateField(null=True, blank=True)
    publication_year = models.DateField(null=True, blank=True)
    exchange = models.OneToOneField(Exchange, models.CASCADE)



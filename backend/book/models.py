from django.core import exceptions
from django.db import models
from exchange.models import Exchange


class ChoiceCondition(models.CharField):
    def validate(self, value, model_instance):
        if not self.editable:
            # Skip validation for non-editable fields.
            return

        if self.choices is not None and value not in self.empty_values:
            for option_key, option_value in self.choices:
                if isinstance(option_value, (list, tuple)):
                    # This is an optgroup, so look inside the group for
                    # options.
                    for optgroup_key, optgroup_value in option_value:
                        if value == optgroup_key:
                            return
                elif value == option_key:
                    return
            raise exceptions.ValidationError(
                f"Допустимые значения: {dict(Book.CONDITIONS).keys()}"
            )

        if value is None and not self.null:
            raise exceptions.ValidationError(self.error_messages["null"], code="null")

        if not self.blank and value in self.empty_values:
            raise exceptions.ValidationError(self.error_messages["blank"], code="blank")


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
    condition = ChoiceCondition(max_length=2, choices=CONDITIONS, default=EXCELLENT)
    writing_year = models.DateField(null=True, blank=True)
    publication_year = models.DateField(null=True, blank=True)
    exchange = models.OneToOneField(Exchange, models.CASCADE)

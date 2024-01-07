from django.urls import path

from exchange.views import ExchangeListAPIView, ExchangeCreateAPIView, ExchangeUserAPIView, ExchangeDetailAPIView

urlpatterns = [
    path("", ExchangeListAPIView.as_view(), name="exchanges"),
    path("create/", ExchangeCreateAPIView.as_view(), name="exchange-create"),
    path("user/<slug:username>", ExchangeUserAPIView.as_view(), name="exchanges-user"),
    path("<int:id>", ExchangeDetailAPIView.as_view(), name="exchange-detail"),
]

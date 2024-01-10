from django.urls import path

from exchange.views import ExchangeListAPIView, ExchangeCreateAPIView, ExchangeUserAllAPIView, ExchangeDetailAPIView, \
    ExchangeUserActiveAPIView, ExchangeUserHistoryAllAPIView

urlpatterns = [
    path("", ExchangeListAPIView.as_view(), name="exchanges"),
    path("create/", ExchangeCreateAPIView.as_view(), name="exchange-create"),
    path("user/<slug:username>/all", ExchangeUserAllAPIView.as_view(), name="exchanges-user-all"),
    path("user/<slug:username>/active", ExchangeUserActiveAPIView.as_view(), name="exchanges-user-active"),
    path("user/<slug:username>/history", ExchangeUserHistoryAllAPIView.as_view(), name="exchanges-user-history"),
    path("<int:id>", ExchangeDetailAPIView.as_view(), name="exchange-detail"),
]

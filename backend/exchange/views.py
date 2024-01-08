from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from exchange.models import Exchange
from exchange.serializers import ExchangeSerializer


class ExchangeListAPIView(ListAPIView):
    serializer_class = ExchangeSerializer
    queryset = Exchange.objects.all()


class ExchangeUserAllAPIView(ListAPIView):
    serializer_class = ExchangeSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        return Exchange.objects.filter(user__username=username)


class ExchangeUserActiveAPIView(ListAPIView):
    serializer_class = ExchangeSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        return Exchange.objects.filter(user__username=username, is_active=True)


class ExchangeUserHistoryAllAPIView(ListAPIView):
    serializer_class = ExchangeSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        return Exchange.objects.filter(user__username=username, is_active=False)


class ExchangeCreateAPIView(CreateAPIView):
    """
    :param
    Condition value must be in [EX, GD, MD, PR] - excellent, good, moderately, poor
    """
    serializer_class = ExchangeSerializer
    queryset = Exchange.objects.all()


class ExchangeDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ExchangeSerializer
    queryset = Exchange.objects.all()
    lookup_field = "id"

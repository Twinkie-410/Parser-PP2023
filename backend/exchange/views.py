from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from exchange.models import Exchange
from exchange.serializers import ExchangeSerializer


class ExchangeListAPIView(ListAPIView):
    serializer_class = ExchangeSerializer
    queryset = Exchange.objects.all()


class ExchangeUserAPIView(ListAPIView):
    serializer_class = ExchangeSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        return Exchange.objects.filter(user__username=username)


class ExchangeCreateAPIView(CreateAPIView):
    serializer_class = ExchangeSerializer
    queryset = Exchange.objects.all()


class ExchangeDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ExchangeSerializer
    queryset = Exchange.objects.all()
    lookup_field = "id"

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from exchange.models import Exchange
from exchange.serializers import ExchangeSerializer


class ExchangeListAPIView(ListAPIView):
    serializer_class = ExchangeSerializer
    queryset = Exchange.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["book__title", "book__author", "book__genre"]
    ordering = ["-updated_at"]


class ExchangeUserAllAPIView(ListAPIView):
    serializer_class = ExchangeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["book__title", "book__author", "book__genre"]
    ordering = ["-updated_at"]

    def get_queryset(self):
        username = self.kwargs["username"]
        return Exchange.objects.filter(user__username=username)


class ExchangeUserActiveAPIView(ListAPIView):
    serializer_class = ExchangeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["book__title", "book__author", "book__genre"]
    ordering = ["-updated_at"]

    def get_queryset(self):
        username = self.kwargs["username"]
        return Exchange.objects.filter(user__username=username, is_active=True)


class ExchangeUserHistoryAllAPIView(ListAPIView):
    serializer_class = ExchangeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["book__title", "book__author", "book__genre"]
    ordering = ["-updated_at"]

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

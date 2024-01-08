from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.utils import model_meta

from book.models import Book
from book.serializers import BookSerializer
from exchange.models import Exchange


class ExchangeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    book = BookSerializer()

    class Meta:
        model = Exchange
        fields = ["id", "username", "book", "is_active", "price", "created_at", "updated_at", "description"]
        read_only_fields = ["id", "created_at", "updated_at"]
        extra_kwargs = {"book": {"required": True}}

    def create(self, validated_data):
        book_data = validated_data.pop("book")
        user = get_user_model().objects.get(username=validated_data.pop("user")["username"])
        exchange = Exchange.objects.create(user=user, **validated_data)
        Book.objects.create(exchange=exchange, **book_data)
        exchange.save()

        return exchange

    def update(self, instance, validated_data):
        if "book" in validated_data:
            nested_serializer = self.fields["book"]
            nested_instance = instance.book
            nested_data = validated_data.pop("book")

            nested_serializer.update(nested_instance, nested_data)

        if "user" in validated_data:
            user = get_user_model().objects.get(username=validated_data.pop("user")["username"])
            instance.user = user

        info = model_meta.get_field_info(instance)
        m2m_fields = []
        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                m2m_fields.append((attr, value))
            else:
                setattr(instance, attr, value)

        instance.save()

        for attr, value in m2m_fields:
            field = getattr(instance, attr)
            field.set(value)

        return instance

    def validate_username(self, value):
        try:
            get_user_model().objects.get(username=value)
        except get_user_model().DoesNotExist:
            raise serializers.ValidationError("User with this username was not found")

        return value

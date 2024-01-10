from rest_framework import serializers

from book.models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["title", "author", "genre", "condition", "writing_year", "publication_year"]

    def validate_condition(self, value):
        raise serializers.ValidationError("hehe error")

        return value

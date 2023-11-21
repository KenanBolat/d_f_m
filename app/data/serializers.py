"""
Serializers for FaceID API.
"""
from rest_framework import serializers

from core.models import (Data)


class DataSerializer(serializers.ModelSerializer):
    """Serializer for data."""

    class Meta:
        model = Data
        fields = ['id',
                  'title',
                  'data_tag', ]
        read_only_fields = ['id']

    def create(self, validated_data):
        """Create a data."""
        data = Data.objects.create(**validated_data)
        return data

    def update(self, instance, validated_data):
        """Update data."""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class DataDetailSerializer(DataSerializer):
    """Serializer for data detail view."""

    class Meta(DataSerializer.Meta):
        fields = DataSerializer.Meta.fields + ['description',]


class FaceIDImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading image to FaceID."""

    class Meta:
        model = Data
        fields = ['id', 'image']
        read_only_fields = ['id']
        extra_kwargs = {'image': {'required': 'True'}}


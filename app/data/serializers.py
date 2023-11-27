"""
Serializers for FaceID API.
"""
from rest_framework import serializers

from core.models import (Data, Configuration)


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


class ConfigurationSerializer(serializers.ModelSerializer):
    satellite_mission = serializers.CharField(required=True)
    class Meta:
        model = Configuration
        fields = [ 'satellite_mission', 'folder_locations', 'ftp_server', 'ftp_user_name', 'ftp_password', 'ftp_port',]
        lookup_field = 'satellite_mission'
        read_only_fields = ['satellite_mission']
        extra_kwargs = {
            'url': {'lookup_field': 'satellite_mission'}
        }



    def create(self, validated_data):
        """Create a data."""
        return Configuration.objects.create(**validated_data)



"""
Serializers for FaceID API.
"""
from rest_framework import serializers

from core.models import (Data, Configuration, Mission, Event, Consumed, File, Notification, )


class MissionField(serializers.Field):
    def to_representation(self, value):
        return value.satellite_mission

    def to_internal_value(self, data):
        mission = Mission.objects.get(satellite_mission=data)
        return mission


class FaceIDImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading image to FaceID."""

    class Meta:
        model = Data
        fields = ['id', 'image']
        read_only_fields = ['id']
        extra_kwargs = {'image': {'required': 'True'}}


class ConfigurationSerializer(serializers.ModelSerializer):
    satellite_mission = serializers.SlugRelatedField(required=True,
                                                     slug_field='satellite_mission',
                                                     many=False,
                                                     queryset=Mission.objects.all())

    class Meta:
        model = Configuration
        fields = ['id',
                  'satellite_mission',
                  'folder_locations',
                  'ftp_server',
                  'ftp_user_name',
                  'ftp_password',
                  'ftp_port', ]
        lookup_field = 'satellite_mission__satellite_mission'
        read_only_fields = ['satellite_mission', 'id']
        # extra_kwargs = {
        #     'url': {'lookup_field': 'satellite_mission'}
        # }

    def create(self, validated_data):
        """Create a data."""
        return Configuration.objects.create(**validated_data)

    def get_satellite_mission(self, obj):
        return obj.satellite_mission.satellite_mission


class MissionSerializer(serializers.ModelSerializer):
    """Serializer for missions."""

    class Meta:
        model = Mission
        fields = ['id', 'satellite_mission', 'is_active', 'created_at', 'updated_at', 'description', ]
        read_only_fields = ['id']

    def create(self, validated_data):
        """Create a data."""
        return Mission.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update data."""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class EventSerializer(serializers.ModelSerializer):
    """Serializer for produced messages."""

    class Meta:
        model = Event
        fields = ['id', 'message_id', 'queue_name', 'content', 'created_at', 'service_name', 'producer_ip', ]
        read_only_fields = ['id']

    def create(self, validated_data):
        """Create a data."""
        return Event.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update data."""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class FileSerializer(serializers.ModelSerializer):
    """Serializer for files."""

    class Meta:
        model = File
        fields = ['id',
                  'data',
                  'file_name',
                  'file_path',
                  'file_date',
                  'file_size',
                  'file_type',
                  'file_status',
                  'is_active',
                  'download_url',
                  'downloaded_at',
                  'mongo_id', ]
        read_only_fields = ['id']

    def create(self, validated_data):
        """Create a data."""
        return File.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update data."""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class ConsumedMessageSerializer(serializers.ModelSerializer):
    """Serializer for consumed messages."""

    message_id = serializers.SlugRelatedField(required=True,
                                              slug_field='message_id',
                                              many=False,
                                              queryset=Event.objects.all())

    class Meta:
        model = Consumed
        fields = ['id', 'message_id', 'consumed_at', 'consumer_ip', 'consumer_name', ]
        read_only_fields = ['id']

    def create(self, validated_data):
        """Create a data."""
        return Consumed.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update data."""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class DataSerializer(serializers.ModelSerializer):
    """Serializer for data."""

    # satellite_mission = serializers.SlugRelatedField(required=True,
    #                                                  slug_field='satellite_mission',
    #                                                  many=False,
    #                                                  queryset=Mission.objects.all())
    converted_files = FileSerializer(many=True, read_only=True)

    class Meta:
        model = Data
        fields = ['id',
                  'date_tag',
                  'status',
                  'files',
                  'satellite_mission',
                  'converted_files', ]
        # lookup_field = 'satellite_mission__satellite_mission'
        read_only_fields = ['satellite_mission', 'id']
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
        fields = DataSerializer.Meta.fields + ['description', ]


class NotificationSerializer(serializers.ModelSerializer):
    """Serializer for notifications."""

    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['id']

    def create(self, validated_data):
        """Create a data."""
        return Notification.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update data."""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

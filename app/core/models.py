"""
Database models.
"""
import uuid
import os
from enum import unique
from django.core.files.storage import FileSystemStorage

from django.conf import settings
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)


def data_path(instance, filename):
    """Generate file path for new data image."""
    ext = os.path.splitext(filename)[1]
    filename = f'{uuid.uuid4()}{ext}'

    return os.path.join('uploads', 'data', filename)


class OverwriteStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        # If the file exists, delete it so the new file overwrites it
        if self.exists(name):
            os.remove(os.path.join(self.location, name))
        return name

class UserManager(BaseUserManager):
    """ Manager for users. """

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user. """
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self.db)

        return user

    def create_superuser(self, email, password):
        """Create and return new superuser."""

        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User in the system."""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    blocked = models.BooleanField(null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Mission(models.Model):
    """Missions object."""
    satellite_mission = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.satellite_mission}"


class Configuration(models.Model):
    """Configuration object."""
    # satellite_mission = models.CharField(max_length=255)
    satellite_mission = models.OneToOneField(
        Mission,
        on_delete=models.CASCADE, related_name='missions'
    )
    folder_locations = models.JSONField(null=True, blank=True, default={
        'chanel 01': '_________',
        'chanel 02': 'HRV______',
        'chanel 03': 'IR_016___',
        'chanel 04': 'IR_039___',
        'chanel 05': 'IR_087___',
        'chanel 06': 'IR_097___',
        'chanel 07': 'IR_108___',
        'chanel 08': 'IR_120___',
        'chanel 09': 'IR_134___',   
        'chanel 10': 'VIS006___',
        'chanel 11': 'VIS008___',
        'chanel 12': 'WV_062___',
        'chanel 13': 'WV_073___'
    })
    ftp_server = models.CharField(max_length=255, default='ftp_server')
    ftp_user_name = models.CharField(max_length=255, default='foo')
    ftp_password = models.CharField(max_length=255, default='bar')
    ftp_port = models.IntegerField(default=21)
    status = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(null=True, blank=True)
    ## bbox = left,bottom,right,top
    ## bbox = min Longitude , min Latitude , max Longitude , max Latitude
    bbox = models.CharField(max_length=255, null=True, blank=True, default={
        '23.115234375, 32.694865977875075, 48.076171875, 44.5278427984555'
    })

    def __str__(self):
        return f"{self.satellite_mission}"


class DataTracking(models.Model):
    """DataTracking object."""
    # user = models.ForeignKey(
    #     settings.AUTH_USER_MODEL,
    #     on_delete=models.CASCADE,
    # )
    # data = models.ForeignKey(
    #     Data,
    #     on_delete=models.CASCADE,
    # )
    satellite_mission = models.CharField(max_length=255)
    file_name = models.CharField(max_length=255)
    file_path = models.CharField(max_length=255)
    file_size = models.CharField(max_length=255)
    file_date = models.CharField(max_length=255)
    file_type = models.CharField(max_length=255)
    file_status = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return self.file_name


class Event(models.Model):
    message_id = models.UUIDField(max_length=255, default=uuid.uuid4, unique=True, editable=False)
    queue_name = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    service_name = models.CharField(max_length=255)  # Name of the service producing the message
    producer_ip = models.GenericIPAddressField()

    def __str__(self):
        return f"{self.message_id}"


class Consumed(models.Model):
    message_id = models.OneToOneField(Event, on_delete=models.CASCADE)
    consumed_at = models.DateTimeField(auto_now_add=True)
    consumer_ip = models.GenericIPAddressField()
    consumer_name = models.CharField(max_length=255)  # Name of the service consuming the message

    def __str__(self):
        return f"{self.message_id}"


class Data(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=255)
    satellite_mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    date_tag = models.CharField(max_length=255)
    # data_tag = models.ImageField(null=True, upload_to=data_path)
    data_tag = models.CharField(max_length=255)
    files = models.JSONField(max_length=255)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    PROCESSING = 'processing'
    CANCELLED = 'cancelled'
    READY = 'ready'
    ERROR = 'error'
    DOWNLOADING = 'downloading'
    DONE = 'done'
    STATUS_CHOICES = [
        (PROCESSING, 'Processing'),
        (CANCELLED, 'Cancelled'),
        (READY, 'Ready'),
        (ERROR, 'Error'),
        (DOWNLOADING, 'Downloading'),
        (DONE, 'Done'),
    ]

    status = models.CharField(max_length=255, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ('satellite_mission', 'date_tag')

    def __str__(self):
        return f"{self.satellite_mission} : {self.date_tag}"


class File(models.Model):
    data = models.ForeignKey(Data, on_delete=models.CASCADE, related_name='converted_files')
    file_name = models.CharField(max_length=255)
    file_path = models.CharField(max_length=255)
    file_size = models.CharField(max_length=255)
    file_date = models.CharField(max_length=255)
    file_type = models.CharField(max_length=255)
    file_status = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(null=True, blank=True)

    download_url = models.CharField(max_length=255, null=True, blank=True)
    downloaded = models.BooleanField(max_length=255, null=True, blank=True)
    downloaded_at = models.DateTimeField(null=True, blank=True)
    mongo_id = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        unique_together = ('data', 'file_name')

    def __str__(self):
        return self.file_name


class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    icon = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-time']
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'

class UploadedImage(models.Model):
    title = models.CharField(max_length=255, unique=True)
    image = models.ImageField(upload_to='images/',  storage=OverwriteStorage())
    uploaded_at = models.DateTimeField(auto_now_add=True)
    deleted = models.BooleanField(default=False)
    active = models.BooleanField(default=True)


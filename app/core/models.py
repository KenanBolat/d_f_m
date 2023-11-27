"""
Database models.
"""
import uuid
import os

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


class Data(models.Model):
    """FaceID object."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=255)
    data_tag = models.ImageField(null=True, upload_to=data_path)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title


class Configuration(models.Model):
    """Configuration object."""
    satellite_mission = models.CharField(max_length=255)
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
    ftp_server = models.CharField(max_length=255, default='localhost')
    ftp_user_name = models.CharField(max_length=255, default='foo')
    ftp_password = models.CharField(max_length=255, default='bar')
    ftp_port = models.IntegerField(default=201)
    status = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return self.satellite_mission

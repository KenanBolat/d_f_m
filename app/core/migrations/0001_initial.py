# Generated by Django 4.0.10 on 2024-05-27 21:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=True)),
                ('blocked', models.BooleanField(blank=True, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='DataTracking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('satellite_mission', models.CharField(max_length=255)),
                ('file_name', models.CharField(max_length=255)),
                ('file_path', models.CharField(max_length=255)),
                ('file_size', models.CharField(max_length=255)),
                ('file_date', models.CharField(max_length=255)),
                ('file_type', models.CharField(max_length=255)),
                ('file_status', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message_id', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('queue_name', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('service_name', models.CharField(max_length=255)),
                ('producer_ip', models.GenericIPAddressField()),
            ],
        ),
        migrations.CreateModel(
            name='Mission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('satellite_mission', models.CharField(max_length=255, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('icon', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('read', models.BooleanField(default=False)),
                ('modified', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Notification',
                'verbose_name_plural': 'Notifications',
                'ordering': ['-time'],
            },
        ),
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('date_tag', models.CharField(max_length=255)),
                ('data_tag', models.CharField(max_length=255)),
                ('files', models.JSONField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(choices=[('processing', 'Processing'), ('cancelled', 'Cancelled'), ('ready', 'Ready'), ('error', 'Error'), ('downloading', 'Downloading'), ('done', 'Done')], max_length=255)),
                ('satellite_mission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.mission')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('satellite_mission', 'date_tag')},
            },
        ),
        migrations.CreateModel(
            name='Consumed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('consumed_at', models.DateTimeField(auto_now_add=True)),
                ('consumer_ip', models.GenericIPAddressField()),
                ('consumer_name', models.CharField(max_length=255)),
                ('message_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='core.event')),
            ],
        ),
        migrations.CreateModel(
            name='Configuration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('folder_locations', models.JSONField(blank=True, default={'chanel 01': '_________', 'chanel 02': 'HRV______', 'chanel 03': 'IR_016___', 'chanel 04': 'IR_039___', 'chanel 05': 'IR_087___', 'chanel 06': 'IR_097___', 'chanel 07': 'IR_108___', 'chanel 08': 'IR_120___', 'chanel 09': 'IR_134___', 'chanel 10': 'VIS006___', 'chanel 11': 'VIS008___', 'chanel 12': 'WV_062___', 'chanel 13': 'WV_073___'}, null=True)),
                ('ftp_server', models.CharField(default='ftp_server', max_length=255)),
                ('ftp_user_name', models.CharField(default='foo', max_length=255)),
                ('ftp_password', models.CharField(default='bar', max_length=255)),
                ('ftp_port', models.IntegerField(default=21)),
                ('status', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(blank=True, null=True)),
                ('satellite_mission', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='missions', to='core.mission')),
            ],
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(max_length=255)),
                ('file_path', models.CharField(max_length=255)),
                ('file_size', models.CharField(max_length=255)),
                ('file_date', models.CharField(max_length=255)),
                ('file_type', models.CharField(max_length=255)),
                ('file_status', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(blank=True, null=True)),
                ('download_url', models.CharField(blank=True, max_length=255, null=True)),
                ('downloaded', models.BooleanField(blank=True, max_length=255, null=True)),
                ('downloaded_at', models.DateTimeField(blank=True, null=True)),
                ('mongo_id', models.CharField(blank=True, max_length=255, null=True)),
                ('data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='converted_files', to='core.data')),
            ],
            options={
                'unique_together': {('data', 'file_name')},
            },
        ),
    ]

# Generated by Django 4.0.10 on 2023-11-29 06:54

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_configuration_satellite_mission'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProducedMessage',
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
            name='ConsumedMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('consumed_at', models.DateTimeField(auto_now_add=True)),
                ('consumer_ip', models.GenericIPAddressField()),
                ('consumer_name', models.CharField(max_length=255)),
                ('consumed_message', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.producedmessage')),
            ],
        ),
    ]

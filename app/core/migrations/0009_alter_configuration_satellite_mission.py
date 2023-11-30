# Generated by Django 4.0.10 on 2023-11-30 11:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_alter_configuration_satellite_mission'),
    ]

    operations = [
        migrations.AlterField(
            model_name='configuration',
            name='satellite_mission',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='missions', to='core.mission'),
        ),
    ]

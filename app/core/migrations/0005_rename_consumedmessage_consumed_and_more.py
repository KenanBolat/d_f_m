# Generated by Django 4.0.10 on 2023-11-29 08:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_rename_consumed_message_consumedmessage_message_id'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ConsumedMessage',
            new_name='Consumed',
        ),
        migrations.RenameModel(
            old_name='ProducedMessage',
            new_name='Event',
        ),
    ]
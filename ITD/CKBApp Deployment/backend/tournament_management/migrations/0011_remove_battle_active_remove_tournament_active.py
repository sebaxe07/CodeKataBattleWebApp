# Generated by Django 5.0.1 on 2024-02-03 04:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tournament_management', '0010_battle_status_tournament_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='battle',
            name='active',
        ),
        migrations.RemoveField(
            model_name='tournament',
            name='active',
        ),
    ]

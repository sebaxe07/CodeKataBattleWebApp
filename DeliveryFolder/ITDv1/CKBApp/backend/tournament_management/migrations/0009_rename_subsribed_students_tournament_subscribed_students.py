# Generated by Django 5.0.1 on 2024-01-31 21:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tournament_management', '0008_tournament_subsribed_students'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tournament',
            old_name='subsribed_Students',
            new_name='subscribed_Students',
        ),
    ]
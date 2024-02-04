# Generated by Django 5.0.1 on 2024-02-03 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tournament_management', '0009_rename_subsribed_students_tournament_subscribed_students'),
    ]

    operations = [
        migrations.AddField(
            model_name='battle',
            name='status',
            field=models.CharField(choices=[('registration', 'Registration'), ('active', 'Active'), ('completed', 'Completed')], default='registration', max_length=12),
        ),
        migrations.AddField(
            model_name='tournament',
            name='status',
            field=models.CharField(choices=[('registration', 'Registration'), ('active', 'Active'), ('completed', 'Completed')], default='registration', max_length=12),
        ),
    ]
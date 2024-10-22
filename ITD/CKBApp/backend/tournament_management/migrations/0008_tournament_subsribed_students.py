# Generated by Django 5.0.1 on 2024-01-31 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tournament_management', '0007_battle_picture_battle_software_project'),
        ('user_management', '0005_alter_userprofile_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='tournament',
            name='subsribed_Students',
            field=models.ManyToManyField(blank=True, related_name='subscribed_tournaments', to='user_management.studentprofile'),
        ),
    ]

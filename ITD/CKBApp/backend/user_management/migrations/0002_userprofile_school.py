# Generated by Django 5.0.1 on 2024-01-13 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='school',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]

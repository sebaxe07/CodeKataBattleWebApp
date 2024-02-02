# Generated by Django 5.0.1 on 2024-02-02 12:49

import team_github_integration.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team_github_integration', '0004_alter_team_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='code',
            field=models.CharField(default=team_github_integration.models.generate_unique_code, max_length=6, unique=True),
        ),
    ]

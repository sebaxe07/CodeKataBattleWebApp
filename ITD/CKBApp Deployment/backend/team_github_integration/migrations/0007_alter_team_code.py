# Generated by Django 5.0.1 on 2024-02-02 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team_github_integration', '0006_alter_team_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='code',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
    ]

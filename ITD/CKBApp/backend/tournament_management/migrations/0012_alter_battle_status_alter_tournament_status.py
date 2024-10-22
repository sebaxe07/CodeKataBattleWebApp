# Generated by Django 5.0.1 on 2024-02-03 23:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tournament_management', '0011_remove_battle_active_remove_tournament_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='battle',
            name='status',
            field=models.CharField(choices=[('registration', 'Registration'), ('active', 'Active'), ('consolidation', 'Consolidation'), ('completed', 'Completed')], default='registration', max_length=14),
        ),
        migrations.AlterField(
            model_name='tournament',
            name='status',
            field=models.CharField(choices=[('registration', 'Registration'), ('active', 'Active'), ('consolidation', 'Consolidation'), ('completed', 'Completed')], default='registration', max_length=14),
        ),
    ]

from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .models import Battle

# Celery task to update the status of the battles
@shared_task
def update_battle_status():
    battles = Battle.objects.all()
    for battle in battles:
        battle.update_status()
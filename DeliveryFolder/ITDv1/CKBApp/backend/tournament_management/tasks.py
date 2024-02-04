from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .models import Battle

@shared_task
def update_battle_status():
    battles = Battle.objects.all()
    for battle in battles:
        battle.update_status()
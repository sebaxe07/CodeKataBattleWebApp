from __future__ import absolute_import, unicode_literals
import os
from celery import Celery


# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Calls update_status() every 10 minutes.
    sender.add_periodic_task(600.0, update_status.s(), name='update status every 10 minutes')

@app.task
def update_status():
    from tournament_management.models import Tournament, Battle

    for tournament in Tournament.objects.all():
        tournament.update_status()
    for battle in Battle.objects.all():
        battle.update_status()
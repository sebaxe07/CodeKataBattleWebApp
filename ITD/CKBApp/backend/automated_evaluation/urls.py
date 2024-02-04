from django.urls import path
from .views import webhook

urlpatterns = [
    path('webhook-endpoint', webhook.as_view(), name='webhook'),
]
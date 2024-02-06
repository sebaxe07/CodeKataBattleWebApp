from django.urls import path
from .views import webhook

### URL patterns for the automated_evaluation app
# - webhook-endpoint: endpoint for the github webhook
urlpatterns = [
    path('webhook-endpoint', webhook.as_view(), name='webhook'),
]
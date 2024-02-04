from django.test import TestCase, Client
from django.urls import reverse
from .models import UserProfile, StudentProfile

class WebhookViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.webhook_url = reverse('webhook')

    def test_ignore_codekatabattlehub(self):
        # Set up the POST data
        data = {
            'repo': 'test-repo',
            'commit_sha': 'test-sha',
            'commit_message': 'test-message',
            'author': 'CodeKataBattleHUB',
        }

        # Make a POST request to the webhook view
        response = self.client.post(self.webhook_url, data)

        # Check that the response is a 200 OK
        self.assertEqual(response.status_code, 200)

        # Check that the response body is 'POST request'
        self.assertEqual(response.content.decode(), 'POST request')
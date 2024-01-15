from django.test import TestCase
from django.contrib.auth.models import User
from .models import UserProfile, EducatorProfile, StudentProfile
from .serializers import UserRegisterSerializer
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

class UserRegisterSerializerTest(TestCase):
    def test_create_student(self):
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword',
            'first_name': 'Test',
            'last_name': 'User',
            'user_profile': {
                'role': 'student',
                'school': 'Test School',
            }
        }
        serializer = UserRegisterSerializer(data=data)
        if not serializer.is_valid():
            print(serializer.errors)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(StudentProfile.objects.count(), 1)
        self.assertEqual(EducatorProfile.objects.count(), 0)

    def test_create_educator(self):
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword',
            'first_name': 'Test',
            'last_name': 'User',
            'user_profile': {
                'role': 'educator',
                'school': 'Test School',
            }
        }
        serializer = UserRegisterSerializer(data=data)
        if not serializer.is_valid():
            print(serializer.errors)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(UserProfile.objects.count(), 1)
        self.assertEqual(StudentProfile.objects.count(), 0)
        self.assertEqual(EducatorProfile.objects.count(), 1)


class UserRegistrationViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_student(self):
        url = reverse('register')
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword',
            'first_name': 'Test',
            'last_name': 'User',
            'user_profile': {
                'role': 'student',
                'school': 'Test School',
            }
        }
        response = self.client.post(url, data, format='json')
        print(response.data)  # print the response data
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user']['username'], 'testuser')
        self.assertEqual(response.data['message'], 'User registered successfully.')

    def test_register_educator(self):
        url = reverse('register')
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword',
            'first_name': 'Test',
            'last_name': 'User',
            'user_profile': {
                'role': 'educator',
                'school': 'Test School',
            }
        }
        response = self.client.post(url, data, format='json')
        print(response.data)  # print the response data
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user']['username'], 'testuser')
        self.assertEqual(response.data['message'], 'User registered successfully.')
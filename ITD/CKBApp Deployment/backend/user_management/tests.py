from django.test import TestCase
from django.contrib.auth.models import User
from .models import UserProfile, EducatorProfile, StudentProfile
from .serializers import UserRegisterSerializer, UserSerializer
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework.authtoken.models import Token

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
                'profile_icon': 'tiger.svg',
                'github_username': 'testuser',
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
                'profile_icon': 'tiger.svg',
                'github_username': 'testuser',
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
                'profile_icon': 'tiger.svg',
                'github_username': 'testuser',
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
                'profile_icon': 'tiger.svg',
                'github_username': 'testuser',
            }
        }
        response = self.client.post(url, data, format='json')
        print(response.data)  # print the response data
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user']['username'], 'testuser')
        self.assertEqual(response.data['message'], 'User registered successfully.')


class UserSerializerTest(TestCase):
    def setUp(self):
        self.user_attributes = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User',
        }

        self.user_profile_attributes = {
            'role': 'student',
            'school': 'Test School',
            'profile_icon': 'tiger.svg',
            'github_username': 'testuser',
        }

        self.user = User.objects.create(**self.user_attributes)
        self.userprofile = UserProfile.objects.create(user=self.user, **self.user_profile_attributes)
        self.serializer = UserSerializer(instance=self.user)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertCountEqual(data.keys(), ['id', 'username', 'email', 'first_name', 'last_name', 'user_profile'])

    def test_user_field_content(self):
        data = self.serializer.data
        self.assertEqual(data['username'], self.user_attributes['username'])
        self.assertEqual(data['email'], self.user_attributes['email'])
        self.assertEqual(data['first_name'], self.user_attributes['first_name'])
        self.assertEqual(data['last_name'], self.user_attributes['last_name'])

    def test_user_profile_field_content(self):
        data = self.serializer.data
        self.assertEqual(data['user_profile']['role'], self.user_profile_attributes['role'])
        self.assertEqual(data['user_profile']['school'], self.user_profile_attributes['school'])
        self.assertEqual(data['user_profile']['profile_icon'], self.user_profile_attributes['profile_icon'])
        self.assertEqual(data['user_profile']['github_username'], self.user_profile_attributes['github_username'])


class UserDetailViewTest(TestCase):
    def setUp(self):

        self.user_attributes = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User',
        }

        self.user_profile_attributes = {
            'role': 'student',
            'school': 'Test School',
            'profile_icon': 'tiger.svg',
            'github_username': 'testuser',
        }

        self.user = User.objects.create(**self.user_attributes)
        self.userprofile = UserProfile.objects.create(user=self.user, **self.user_profile_attributes)
        self.serializer = UserSerializer(instance=self.user)

        self.client = APIClient()
        token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_get_user_detail(self):
        response = self.client.get(reverse('profile'))  
        print("Data: ")
        print( response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, UserSerializer(self.user).data)
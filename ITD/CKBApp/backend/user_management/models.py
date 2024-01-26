from django.contrib.auth.models import User
from django.db import models
 
# User profile model base
class UserProfile(models.Model):
    USER_ROLES = (
        ('educator', 'Educator'),
        ('student', 'Student'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile' )
    role = models.CharField(max_length=10, choices=USER_ROLES)
    school = models.CharField(max_length=100)
    profile_icon = models.CharField(max_length=100, default='tiger.svg')
    github_username = models.CharField(max_length=100)

# Educator and student profile models
class EducatorProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    # Add additional fields as needed for educator profile

class StudentProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    # Add additional fields as needed for student profile
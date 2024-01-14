from django.contrib.auth.models import User
from django.db import models

# User profile model base
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.CharField(max_length=100)

# Educator and student profile models
class EducatorProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    # Add additional fields as needed for educator profile

class StudentProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    # Add additional fields as needed for student profile
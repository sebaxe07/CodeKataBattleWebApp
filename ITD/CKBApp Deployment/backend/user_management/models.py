from django.contrib.auth.models import User
from django.db import models
 
# User profile model base
# - user: the user associated with the profile
# - role: the role of the user
# - school: the school of the user
# - profile_icon: the profile icon of the user
# - github_username: the github username of the user
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
# - user_profile: the user profile associated with the educator or student
class EducatorProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)

class StudentProfile(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
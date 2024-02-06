from rest_framework import serializers
from .models import Team
from django.contrib.auth.models import User
from user_management.models import StudentProfile, UserProfile
from tournament_management.models import Battle

# Serializers for the models in the team_github_integration app
# - UserSerializer: serializer for the User model
# - UserProfileSerializer: serializer for the UserProfile model
# - StudentProfileSerializer: serializer for the StudentProfile model
# - BattleSerializer: serializer for the Battle model
# - TeamSerializer: serializer for the Team model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name']  

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'profile_icon']

class StudentProfileSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = StudentProfile
        fields = ['user_profile']

class BattleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Battle
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

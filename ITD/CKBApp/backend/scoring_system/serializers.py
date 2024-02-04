from rest_framework import serializers
from .models import BattleScore
from team_github_integration.models import Team
from user_management.models import StudentProfile, UserProfile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')

class UserProfile(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ('id', 'role', 'profile_icon', 'github_username', 'user')

class StudentProfileSerializer(serializers.ModelSerializer):
    user_profile = UserProfile(read_only=True)

    class Meta:
        model = StudentProfile
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    members = StudentProfileSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ('id', 'members')

class BattleScoreSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)

    class Meta:
        model = BattleScore
        fields = '__all__'
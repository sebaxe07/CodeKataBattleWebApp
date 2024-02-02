from rest_framework import serializers
from .models import Tournament, Battle
from django.contrib.auth.models import User
from user_management.models import EducatorProfile, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name']  

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'profile_icon']

class EducatorProfileSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = EducatorProfile
        fields = ['user_profile']

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'

class BattleSerializer(serializers.ModelSerializer):
    created_by = EducatorProfileSerializer(read_only=True)

    class Meta:
        model = Battle
        fields = '__all__'  



class TournamentWithBattlesSerializer(serializers.ModelSerializer):
    battles = BattleSerializer(many=True, read_only=True)
    created_by = EducatorProfileSerializer(read_only=True)

    class Meta:
        model = Tournament
        fields = '__all__'
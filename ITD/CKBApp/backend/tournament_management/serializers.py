from rest_framework import serializers
from .models import Tournament, Battle
from django.contrib.auth.models import User
from user_management.models import EducatorProfile, UserProfile

# Serializers for the models in the tournament_management app
# - UserSerializer: serializer for the User model
# - UserProfile: serializer for the UserProfile model
# - EducatorProfileSerializer: serializer for the EducatorProfile model
# - TournamentSerializer: serializer for the Tournament model
# - BattleSerializer: serializer for the Battle model
# - TournamentWithBattlesSerializer: serializer for the Tournament model with Battle serializer
# - TournameentEducatorSerializer: serializer for the Tournament model with EducatorProfile serializer
# - BattleEducatorSerializer: serializer for the Battle model with EducatorProfile serializer

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

class TournameentEducatorSerializer(serializers.ModelSerializer):
    created_by = EducatorProfileSerializer(read_only=True)

    class Meta:
        model = Tournament
        fields = '__all__'
        

class BattleEducatorSerializer(serializers.ModelSerializer):
    created_by = EducatorProfileSerializer(read_only=True)

    class Meta:
        model = Battle
        fields = '__all__'  

class BattleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Battle
        fields = '__all__'  


class TournamentWithBattlesSerializer(serializers.ModelSerializer):
    battles = BattleEducatorSerializer(many=True, read_only=True)
    created_by = EducatorProfileSerializer(read_only=True)

    class Meta:
        model = Tournament
        fields = '__all__'
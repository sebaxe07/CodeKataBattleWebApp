from rest_framework import serializers
from .models import BattleScore, TournamentScore
from team_github_integration.models import Team
from automated_evaluation.models import Repository
from user_management.models import StudentProfile, UserProfile
from django.contrib.auth.models import User


# Serializers for the models in the scoring_system app
# - UserSerializer: serializer for the User model
# - UserProfile: serializer for the UserProfile model
# - StudentProfileSerializer: serializer for the StudentProfile model
# - RepositorySerializer: serializer for the Repository model
# - TeamSerializer: serializer for the Team model
# - BattleScoreSerializer: serializer for the BattleScore model
# - TournamentScoreSerializer: serializer for the TournamentScore model

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

class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    members = StudentProfileSerializer(many=True, read_only=True)
    repository = RepositorySerializer(read_only=True, many=True, source='repository_set')  

    class Meta:
        model = Team
        fields = ('id', 'name', 'members', 'repository')

class BattleScoreSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)

    class Meta:
        model = BattleScore
        fields = '__all__'

class TournamentScoreSerializer(serializers.ModelSerializer):
    student = StudentProfileSerializer(read_only=True)

    class Meta:
        model = TournamentScore
        fields = '__all__'
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, EducatorProfile, StudentProfile
from github import Github, UnknownObjectException
from django.conf import settings

# Serializers for the models in the user_management app
# - UserProfileSerializer: serializer for the UserProfile model
# - EducatorProfileSerializer: serializer for the EducatorProfile model
# - StudentProfileSerializer: serializer for the StudentProfile model
# - UserSerializer: serializer for the User model
# - UserProfileRegisterSerializer: serializer for the UserProfile model for registration
# - UserRegisterSerializer: serializer for the User model for registration

# Note: The User model is imported from django.contrib.auth.models
# Note: The User Login, Logout, Password Reset, Password Change and email verification are 
# handle by Djoser, so we don't need to create a serializer for it

class EducatorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducatorProfile
        fields = '__all__'

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'role', 'school', 'profile_icon', 'github_username')
        


class UserSerializer(serializers.ModelSerializer):
    user_profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email',  'first_name', 'last_name', 'user_profile')

    def get_user_profile(self, obj):
        return UserProfileSerializer(obj.user_profile).data
    
class UserProfileRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'role', 'school', 'profile_icon', 'github_username')

    def validate_github_username(self, value):
        github_token = settings.GITHUB_ACCESS_TOKEN

        g = Github(github_token)  
        try:
            g.get_user(value)
        except UnknownObjectException:
            raise serializers.ValidationError("The GitHub username is not valid.")
        return value

class UserRegisterSerializer(serializers.ModelSerializer):
    user_profile = UserProfileRegisterSerializer(write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'user_profile')

    

    def create(self, validated_data):
        user_profile_data = validated_data.pop('user_profile')
        validated_data['is_active'] = False  # Set is_active to False until email is verified
        user = User.objects.create_user(**validated_data)

        user_profile = UserProfile.objects.create(user=user, **user_profile_data)

        if user_profile_data['role'] == 'student':
            StudentProfile.objects.create(user_profile=user_profile)
        elif user_profile_data['role'] == 'educator':
            EducatorProfile.objects.create(user_profile=user_profile)

        return user
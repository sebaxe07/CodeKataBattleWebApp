from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, EducatorProfile, StudentProfile



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('role', 'school')

class UserRegisterSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'user_profile')

    def create(self, validated_data):
        user_profile_data = validated_data.pop('user_profile')
        user = User.objects.create_user(**validated_data)

        user_profile = UserProfile.objects.create(user=user, **user_profile_data)

        if user_profile_data['role'] == 'student':
            StudentProfile.objects.create(user_profile=user_profile)
        elif user_profile_data['role'] == 'educator':
            EducatorProfile.objects.create(user_profile=user_profile)

        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ('username', 'password')
 
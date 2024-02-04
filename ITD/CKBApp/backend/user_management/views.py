from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from .serializers import UserRegisterSerializer, UserSerializer, EducatorProfileSerializer, StudentProfileSerializer
from .models import EducatorProfile, StudentProfile
from rest_framework import status
from django.contrib.auth.models import User

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = (permissions.AllowAny,)
    
    def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                username = serializer.validated_data.get('username')
                email = serializer.validated_data.get('email')
                if User.objects.filter(username=username).exists():
                    return Response({"username": ["Username is already in use."]}, status=status.HTTP_400_BAD_REQUEST)
                if User.objects.filter(email=email).exists():
                    return Response({"email": ["Email is already in use."]}, status=status.HTTP_400_BAD_REQUEST)
                serializer.save()
                # Customized response
                user_data = serializer.data
                response_data = {
                    'user': user_data,
                    'message': 'User registered successfully.',
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
            else:
                # Handle the validation error
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
class EducatorProfileDetailView(generics.RetrieveAPIView):
    queryset = EducatorProfile.objects.all()
    serializer_class = EducatorProfileSerializer

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user_profile_id=self.kwargs["pk"])
        return obj
    
class StudentProfileDetailView(generics.RetrieveAPIView):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user_profile_id=self.kwargs["pk"])
        return obj

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user


class UserLogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        Token.objects.filter(user=user).delete()
        return Response({'message': 'Successfully logged out.'})

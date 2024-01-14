from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        # Override create method to customize the response
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Customize the response data as needed
        user_data = serializer.data
        response_data = {
            'user': user_data,
            'message': 'User registered successfully.',
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

class UserProfileView(generics.RetrieveUpdateAPIView):
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

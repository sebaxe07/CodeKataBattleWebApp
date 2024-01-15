from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import UserRegisterSerializer
from rest_framework import status



 
class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = (permissions.AllowAny,)
    def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
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


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

class UserLogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        Token.objects.filter(user=user).delete()
        return Response({'message': 'Successfully logged out.'})

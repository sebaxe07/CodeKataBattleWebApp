from django.urls import path
from .views import UserRegistrationView, UserProfileView, UserLogoutView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]
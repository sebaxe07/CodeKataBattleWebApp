from django.urls import path
from .views import UserRegistrationView, UserDetailView, UserLogoutView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/', UserDetailView.as_view(), name='profile'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]
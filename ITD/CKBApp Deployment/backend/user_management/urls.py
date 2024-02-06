from django.urls import path
from .views import UserRegistrationView, UserDetailView, UserLogoutView, EducatorProfileDetailView, StudentProfileDetailView

# URL patterns for the user_management app
urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/', UserDetailView.as_view(), name='profile'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('educator-profile/<int:pk>/', EducatorProfileDetailView.as_view(), name='educator-profile'),
    path('student-profile/<int:pk>/', StudentProfileDetailView.as_view(), name='student-profile'),
]
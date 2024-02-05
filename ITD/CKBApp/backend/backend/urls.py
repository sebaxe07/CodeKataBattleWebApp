from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ums/', include('user_management.urls')), 
    path('tms/', include('tournament_management.urls')),
    path('tgms/', include('team_github_integration.urls')),
    path('aes/', include('automated_evaluation.urls')),
    path('ss/', include('scoring_system.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]

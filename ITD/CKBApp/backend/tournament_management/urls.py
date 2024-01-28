from django.urls import path
from .views import TournamentListCreateView, TournamentRetrieveUpdateDestroyView, BattleListCreateView, BattleRetrieveUpdateDestroyView

urlpatterns = [
    path('tournaments/', TournamentListCreateView.as_view(), name='tournament-list-create'),
    path('tournaments/<int:pk>/', TournamentRetrieveUpdateDestroyView.as_view(), name='tournament-retrieve-update-destroy'),
    path('battles/', BattleListCreateView.as_view(), name='battle-list-create'),
    path('battles/<int:pk>/', BattleRetrieveUpdateDestroyView.as_view(), name='battle-retrieve-update-destroy'),
]
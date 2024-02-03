from django.urls import path
from .views import TournamentListCreateView, StartTournamentView, StartBattleView , TournamentRetrieveUpdateDestroyView, BattleListCreateView, BattleRetrieveUpdateDestroyView, UserTournamentsListView, UserBattlesListView, UserBattlesListView, StudentSubscribedTournamentsListView, StudentSubscribeTournament

urlpatterns = [
    path('tournaments/', TournamentListCreateView.as_view(), name='tournament-list-create'),
    path('tournaments/<int:pk>/', TournamentRetrieveUpdateDestroyView.as_view(), name='tournament-retrieve-update-destroy'),
    path('tournaments/user/<int:user_id>/', UserTournamentsListView.as_view(), name='user-tournaments-list'),
    path('tournaments/start/<int:pk>/', StartTournamentView.as_view(), name='start-tournament'),

    path('battles/', BattleListCreateView.as_view(), name='battle-list-create'),
    path('battles/<int:pk>/', BattleRetrieveUpdateDestroyView.as_view(), name='battle-retrieve-update-destroy'),
    path('battles/user/<int:user_id>/<int:tournament_id>', UserBattlesListView.as_view(), name='user-battles-list'),
    path('battles/start/<int:pk>/', StartBattleView.as_view(), name='start-battle'),
    
    path('tournaments/subscribed/<int:student_id>', StudentSubscribedTournamentsListView.as_view(), name='student-subscribed-tournaments-list'),
    path('tournaments/subscribe/<int:student_id>/<int:tournament_id>', StudentSubscribeTournament.as_view(), name='student-subscribe-tournament'),
] 
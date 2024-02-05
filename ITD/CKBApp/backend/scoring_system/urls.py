from django.urls import path
from .views import RankingListView, SetManualScoreView, RankingTournamentListView, StudentScoresView, RankingTournamentOngoingListView

# URL patterns for the scoring_system app
urlpatterns = [
    path('ranking/<int:battle_id>/', RankingListView.as_view(), name='ranking'),
    path('ranking/tournament/<int:tournament_id>/', RankingTournamentListView.as_view(), name='tournament-ranking'),
    path('ranking/tournament/ongoing/', RankingTournamentOngoingListView.as_view(), name='ongoing-tournament-ranking'),
    path('scoring/student/<int:student_id>/', StudentScoresView.as_view(), name='student-scores'),
    path('scoring/manual/<int:scoring_id>/<int:score>/', SetManualScoreView.as_view(), name='manual-scoring'),
]
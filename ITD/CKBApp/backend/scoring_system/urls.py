from django.urls import path
from .views import RankingListView, SetManualScoreView

urlpatterns = [
    path('ranking/<int:battle_id>/', RankingListView.as_view(), name='ranking'),
    path('scoring/manual/<int:scoring_id>/<int:score>/', SetManualScoreView.as_view(), name='manual-scoring'),
]
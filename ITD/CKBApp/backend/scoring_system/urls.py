from django.urls import path
from .views import RankingListView

urlpatterns = [
    path('ranking/<int:battle_id>/', RankingListView.as_view(), name='ranking'),
]
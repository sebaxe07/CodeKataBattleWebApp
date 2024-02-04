from rest_framework import generics
from .models import BattleScore
from team_github_integration.models import Team
from tournament_management.models import Battle
from .serializers import BattleScoreSerializer, TeamSerializer
from .models import update_battle_score


class RankingListView(generics.ListAPIView):
    serializer_class = BattleScoreSerializer

    def get_queryset(self):
        battle_id = self.kwargs['battle_id']
        # Get the BattleScores for the Battle, ordered by total_score in descending order
        return BattleScore.objects.filter(battle_id=battle_id).order_by('-total_score')
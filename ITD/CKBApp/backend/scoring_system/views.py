from rest_framework import generics
from .models import BattleScore
from team_github_integration.models import Team
from tournament_management.models import Battle
from .serializers import BattleScoreSerializer, TeamSerializer
from .models import update_battle_score
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class SetManualScoreView(APIView):
    def patch(self, request, scoring_id, score, format=None):
        try:
            battle_score = BattleScore.objects.get(id=scoring_id)
            battle_score.manual_score = score
            battle_score.is_manual_evaluation = True
            battle_score.update_score(battle_score.functional_score, battle_score.timeliness_score, score)

            return Response({"message": "Manual score updated successfully."}, status=status.HTTP_200_OK)
        except BattleScore.DoesNotExist:
            return Response({"message": "BattleScore not found."}, status=status.HTTP_404_NOT_FOUND)

class RankingListView(generics.ListAPIView):
    serializer_class = BattleScoreSerializer

    def get_queryset(self):
        battle_id = self.kwargs['battle_id']
        # Get the BattleScores for the Battle, ordered by total_score in descending order
        return BattleScore.objects.filter(battle_id=battle_id).order_by('-total_score')
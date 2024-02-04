from rest_framework import generics
from .models import BattleScore, TournamentScore
from team_github_integration.models import Team
from tournament_management.models import Tournament
from user_management.models import StudentProfile
from .serializers import BattleScoreSerializer, TeamSerializer, TournamentScoreSerializer
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

class RankingTournamentListView(generics.ListAPIView):
    serializer_class = TournamentScoreSerializer

    def get_queryset(self):
        tournament_id = self.kwargs['tournament_id']
        # Get the BattleScores for the Tournament, ordered by total_score in descending order
        return TournamentScore.objects.filter(tournament_id=tournament_id).order_by('-total_score')
    
class RankingTournamentOngoingListView(generics.ListAPIView):
    serializer_class = TournamentScoreSerializer

    def get_queryset(self):
        # Get the BattleScores for the ongoing Tournament, ordered by total_score in descending order
        return TournamentScore.objects.filter(tournament__status='active').order_by('-total_score')
    
class StudentScoresView(APIView):
    def get(self, request, student_id, format=None):
        try:
            student = StudentProfile.objects.get(id=student_id)
            tournaments = student.subscribed_tournaments.all()

            organized_scores = []
            for tournament in tournaments:
                tournament_score = TournamentScore.objects.filter(tournament=tournament, student=student).first()
                battle_scores = BattleScore.objects.filter(battle__tournament=tournament, team__members=student)
                battle_scores_serializer = BattleScoreSerializer(battle_scores, many=True)

                top_scores = TournamentScore.objects.filter(tournament=tournament).order_by('-total_score')[:3]
                top_scores_serializer = TournamentScoreSerializer(top_scores, many=True)

                all_scores_desc = list(TournamentScore.objects.filter(tournament=tournament).order_by('-total_score'))

                if tournament_score:
                    score_serializer = TournamentScoreSerializer(tournament_score)
                    score_data = score_serializer.data
                    score_data['position'] = all_scores_desc.index(tournament_score) + 1
                else:
                    score_data = {'tournament': tournament.id, 'student': student.id, 'total_score': 0, 'position': len(all_scores_desc) + 1}

                score_data['battle_scores'] = battle_scores_serializer.data
                score_data['top_tournament_scores'] = top_scores_serializer.data

                organized_scores.append(score_data)
            
            return Response(organized_scores, status=status.HTTP_200_OK)

        except StudentProfile.DoesNotExist:
            return Response({"message": "Student not found."}, status=status.HTTP_404_NOT_FOUND)
        
class RankingListView(generics.ListAPIView):
    serializer_class = BattleScoreSerializer

    def get_queryset(self):
        battle_id = self.kwargs['battle_id']
        # Get the BattleScores for the Battle, ordered by total_score in descending order
        return BattleScore.objects.filter(battle_id=battle_id).order_by('-total_score')
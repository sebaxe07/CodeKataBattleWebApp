from django.shortcuts import render
from rest_framework import generics
from django.http import Http404
from .models import Team
from user_management.models import StudentProfile
from tournament_management.models import Battle
from .serializers import TeamSerializer, StudentProfileSerializer
from rest_framework.response import Response
from django.views import View
from django.db.models import Count
from rest_framework import status
from rest_framework.views import APIView



class TeamListCreateView(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    def get_queryset(self):
        return Team.objects.filter(active=True)
    
class PublicTeamsListView(generics.ListAPIView):
    serializer_class = TeamSerializer

    def get_queryset(self):
        battle_id = self.kwargs['battle_id']
        battle = Battle.objects.get(id=battle_id)
        return Team.objects.annotate(
            members_count=Count('members')
        ).filter(
            is_private=False,
            members_count__lt=battle.max_students_per_group,
            battle_id=battle_id
        )
    
class TeamRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class UserTeamsListView(generics.ListAPIView):
    serializer_class = TeamSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Team.objects.filter(members__id=user_id)
    
class TeamMembersListView(generics.ListAPIView):
    serializer_class = StudentProfileSerializer

    def get_queryset(self):
        team_id = self.kwargs['team_id']
        return Team.objects.get(id=team_id).members.all()
    


class TeamAddMember(APIView):
    def post(self, request, code, student_id, battle_id):
        try:
            team = Team.objects.get(code=code)
            student = StudentProfile.objects.get(id=student_id)
            battle = Battle.objects.get(id=battle_id)

            if team.battle != battle:
                return Response({"error": "The team is not part of the battle you're trying to join!"}, status=status.HTTP_400_BAD_REQUEST)

            if team.members.count() >= team.battle.max_students_per_group:
                return Response({"error": "The team is already full"}, status=status.HTTP_400_BAD_REQUEST)
            
            team.members.add(student)
            team.save()
             # Serialize the team
            team_serializer = TeamSerializer(team)

            return Response({"message": "Student added to the team successfully", "team": team_serializer.data}, status=status.HTTP_200_OK)
        except Team.DoesNotExist:
            return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)
        except StudentProfile.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        except Battle.DoesNotExist:
            return Response({"error": "Battle not found"}, status=status.HTTP_404_NOT_FOUND)
    
class TeamRemoveMember(APIView):
    def post(self, request, code, student_id):
        try:
            team = Team.objects.get(code=code)
            student = StudentProfile.objects.get(id=student_id)
            team.members.remove(student)
            team.save()
            return Response({"message": "Student removed from the team successfully"}, status=status.HTTP_200_OK)
        except Team.DoesNotExist:
            return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)
        except StudentProfile.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        
'''
    
class TeamBattlesListView(generics.ListAPIView):
    serializer_class = BattleSerializer

    def get_queryset(self):
        team_id = self.kwargs['team_id']
        return Team.objects.get(id=team_id).battle.battles.all()
    
class TeamAddGithubRepo(View):
    def post(self, request, team_id, repo_name):
        team = Team.objects.get(id=team_id)
        team.github_repos.add(repo_name)
        return redirect('team-github-repos-list', team_id=team_id)
    
class TeamRemoveGithubRepo(View):
    def post(self, request, team_id, repo_name):
        team = Team.objects.get(id=team_id)
        team.github_repos.remove(repo_name)
        return redirect('team-github-repos-list', team_id=team_id)
    
class TeamGithubReposListView(generics.ListAPIView):
    serializer_class = TeamGithubReposSerializer

    def get_queryset(self):
        team_id = self.kwargs['team_id']
        return Team.objects.get(id=team_id).github_repos.all()
    
    '''
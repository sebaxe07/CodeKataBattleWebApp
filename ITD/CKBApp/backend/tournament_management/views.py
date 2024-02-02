from django.shortcuts import render
from rest_framework import generics
from django.http import Http404
from .models import Tournament, Battle
from user_management.models import StudentProfile
from .serializers import TournamentSerializer, BattleSerializer, TournamentWithBattlesSerializer, BattleEducatorSerializer
from rest_framework.response import Response


# Tournaments views 

class TournamentListCreateView(generics.ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    def get_queryset(self):
        return Tournament.objects.filter(active=True)

class TournamentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class UserTournamentsListView(generics.ListAPIView):
    serializer_class = TournamentSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Tournament.objects.filter(created_by_id=user_id)
    
# Battles views

class UserBattlesListView(generics.ListAPIView):
    serializer_class = BattleEducatorSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        tournament_id=self.kwargs['tournament_id']
        return Battle.objects.filter(created_by_id=user_id , tournament_id=tournament_id)

class BattleListCreateView(generics.ListCreateAPIView):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer

class BattleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer


# Student - Tournaments views

class StudentSubscribedTournamentsListView(generics.ListAPIView):
    serializer_class = TournamentWithBattlesSerializer

    def get_queryset(self):
        student_id = self.kwargs['student_id']
        if student_id is not None:
            student = StudentProfile.objects.get(id=student_id)
            return student.subscribed_tournaments.all()
        else:
            raise Http404("Student ID not provided")

class StudentSubscribeTournament(generics.UpdateAPIView):
    serializer_class = TournamentSerializer

    def post(self, request, *args, **kwargs):
        student_id = self.kwargs['student_id']
        tournament_id = self.kwargs['tournament_id']
        if student_id is not None and tournament_id is not None:
            student = StudentProfile.objects.get(id=student_id)
            tournament = Tournament.objects.get(id=tournament_id)
            tournament.subscribed_Students.add(student)
            return Response("Student subscribed to tournament successfully", status=200)
        else:
            raise Http404("Student ID or Tournament ID not provided")

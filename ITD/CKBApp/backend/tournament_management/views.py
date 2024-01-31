from django.shortcuts import render
from rest_framework import generics
from .models import Tournament, Battle
from .serializers import TournamentSerializer, BattleSerializer

class TournamentListCreateView(generics.ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class TournamentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class UserTournamentsListView(generics.ListAPIView):
    serializer_class = TournamentSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Tournament.objects.filter(created_by_id=user_id)

class UserBattlesListView(generics.ListAPIView):
    serializer_class = BattleSerializer

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
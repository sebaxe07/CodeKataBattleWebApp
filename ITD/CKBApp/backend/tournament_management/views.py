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

class BattleListCreateView(generics.ListCreateAPIView):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer

class BattleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer
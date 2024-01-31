from rest_framework import serializers
from .models import Tournament, Battle

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'

class BattleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Battle
        fields = '__all__'  
from django.conf import settings
from django.shortcuts import render
from rest_framework import generics, status
from django.http import Http404
from .models import Tournament, Battle
from user_management.models import StudentProfile
from .serializers import TournamentSerializer, BattleSerializer, TournamentWithBattlesSerializer, BattleEducatorSerializer
from rest_framework.response import Response
from django.core.mail import send_mass_mail
from django.utils import timezone


# Tournaments views 

class TournamentListCreateView(generics.ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    def get_queryset(self):
        return Tournament.objects.filter(status='registration')
    
    def perform_create(self, serializer):
        tournament = serializer.save()

        # Fetch all students
        students = StudentProfile.objects.all()

        # Prepare the email data
        subject = 'New Tournament Created!'
        from_email = settings.DEFAULT_FROM_EMAIL
        messages = []

        for student in students:
            # Prepare the message for each student
            message = f'A new tournament "{tournament.name}" has been created!\n\nDetails:\n{tournament.description}\n\nLogin to CKB and find out more!'
            to = [student.user_profile.user.email]

            # Add the message to the list of messages
            messages.append((subject, message, from_email, to))

        # Send the emails
        send_mass_mail(messages)

class StartTournamentView(generics.UpdateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    def update(self, request, *args, **kwargs):
        tournament = self.get_object()
        tournament.start_date = timezone.now()
        tournament.status = 'active'
        tournament.save()

        return Response({'status': 'Tournament started'}, status=status.HTTP_200_OK)
    
class TournamentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class UserTournamentsListView(generics.ListAPIView):
    serializer_class = TournamentSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Tournament.objects.filter(created_by_id=user_id)
    
# Battles views
    
class StartBattleView(generics.UpdateAPIView):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer

    def update(self, request, *args, **kwargs):
        battle = self.get_object()
        battle.start_date = timezone.now()
        battle.status = 'active'
        battle.save()

        return Response({'status': 'Battle started'}, status=status.HTTP_200_OK)
    
class ConsolidateBattleView(generics.UpdateAPIView):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer

    def update(self, request, *args, **kwargs):
        battle = self.get_object()
        battle.end_date = timezone.now()
        battle.status = 'consolidation'
        battle.save()

        return Response({'status': 'Battle consolidated'}, status=status.HTTP_200_OK)

class EndBattleView(generics.UpdateAPIView):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer

    def update(self, request, *args, **kwargs):
        battle = self.get_object()
        battle.status = 'completed'
        battle.save()

        return Response({'status': 'Battle ended'}, status=status.HTTP_200_OK)

class UserBattlesListView(generics.ListAPIView):
    serializer_class = BattleEducatorSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        tournament_id=self.kwargs['tournament_id']
        return Battle.objects.filter(created_by_id=user_id , tournament_id=tournament_id)

class BattleListCreateView(generics.ListCreateAPIView):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer

    def perform_create(self, serializer):
        battle = serializer.save()

        # Fetch the tournament
        tournament = battle.tournament  # Use battle.tournament directly

        # Fetch all students subscribed to the tournament
        students = StudentProfile.objects.filter(subscribed_tournaments=tournament)

        # Prepare the email data
        subject = 'New Battle Created!'
        from_email = settings.DEFAULT_FROM_EMAIL
        messages = []

        for student in students:
            # Prepare the message for each student
            message = f'A new battle "{battle.name}" has been created in the tournament "{tournament.name}"!\n\nDetails:\n{battle.description}\n\nRegister deadline:\n{battle.start_date}\n\nLogin to CKB and find out more!'
            to = [student.user_profile.user.email]
            print(to)
            # Add the message to the list of messages
            messages.append((subject, message, from_email, to))

        # Send the emails
        send_mass_mail(messages)

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

            if StudentProfile.objects.filter(id=student_id).exists() == False:
                raise Http404("Student ID not found")
            if Tournament.objects.filter(id=tournament_id).exists() == False:
                raise Http404("Tournament ID not found")
            
            if StudentProfile.objects.get(id=student_id).subscribed_tournaments.filter(id=tournament_id).exists():
                return Response("Student already subscribed to this tournament", status=200)
            
            if Tournament.objects.get(id=tournament_id).status != 'registration':
                return Response("Tournament is not in registration status", status=200)

            student = StudentProfile.objects.get(id=student_id)
            tournament = Tournament.objects.get(id=tournament_id)
            tournament.subscribed_Students.add(student)
            return Response("Student subscribed to tournament successfully", status=200)
        else:
            raise Http404("Student ID or Tournament ID not provided")

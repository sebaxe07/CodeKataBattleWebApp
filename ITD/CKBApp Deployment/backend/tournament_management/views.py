from django.conf import settings
from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status
from django.http import Http404
from .models import Tournament, Battle
from user_management.models import StudentProfile, EducatorProfile
from .serializers import TournamentSerializer, BattleSerializer, TournamentWithBattlesSerializer, BattleEducatorSerializer, TournameentEducatorSerializer
from rest_framework.response import Response
from django.core.mail import send_mass_mail
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.mail import send_mail


# Tournaments views 
# - TournamentListCreateView: view for listing and creating Tournaments
# - TournamentListOngoingView: view for listing ongoing Tournaments
# - StartTournamentView: view for starting a Tournament
# - EndTournamentView: view for ending a Tournament
# - TournamentInviteView: view for inviting an Educator to a Tournament
# - TournamentRetrieveUpdateDestroyView: view for retrieving, updating and deleting a Tournament
# - UserTournamentsListView: view for listing Tournaments of a User
# - InvitedTournamentsListView: view for listing Tournaments invited to an Educator

class TournamentListCreateView(generics.ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    # Get only tournaments in registration status
    def get_queryset(self):
        return Tournament.objects.filter(status='registration')
    
    # Send an email to all students when a new tournament is created
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

class TournamentListOngoingView(generics.ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournameentEducatorSerializer

    def get_queryset(self):
        return Tournament.objects.filter(status='active')
    
class StartTournamentView(generics.UpdateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    # Start the tournament
    # - Set the start date to the current date
    # - Set the status to 'active'
    def update(self, request, *args, **kwargs):
        tournament = self.get_object()
        tournament.start_date = timezone.now()
        tournament.status = 'active'
        tournament.save()

        return Response({'status': 'Tournament started'}, status=status.HTTP_200_OK)

class EndTournamentView(generics.UpdateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    # End the tournament
    # - Set the end date to the current date
    # - Set the status to 'completed'
    def update(self, request, *args, **kwargs):
        tournament = self.get_object()
        tournament.end_date = timezone.now()
        tournament.status = 'completed'
        tournament.save()

        return Response({'status': 'Tournament ended'}, status=status.HTTP_200_OK)
    
class TournamentInviteView(generics.UpdateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

    # Invite an educator to the tournament
    def update(self, request, *args, **kwargs):
        tournament = self.get_object()
        email = request.data.get('email')

        # Get the user
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user is an educator
        if user.user_profile.role != 'educator':
            return Response({'error': 'User with this email is not an educator.'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the educator profile
        educator_profile = EducatorProfile.objects.get(user_profile=user.user_profile)

        # Add the educator to the tournament
        tournament.invited_Educators.add(educator_profile)
        tournament.save()

        send_mail(
            'You have been invited to a tournament',
            f'You have been invited to the tournament {tournament.name}.',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )

        return Response({'status': 'Educator invited successfully.'}, status=status.HTTP_200_OK)
    
    
class TournamentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class UserTournamentsListView(generics.ListAPIView):
    serializer_class = TournamentSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Tournament.objects.filter(created_by_id=user_id)
    

class InvitedTournamentsListView(generics.ListAPIView):
    serializer_class = TournamentSerializer

    def get_queryset(self):
        educator = get_object_or_404(EducatorProfile, id=self.kwargs['educator_id'])
        return Tournament.objects.filter(invited_Educators=educator)
    
# Battles views
# - StartBattleView: view for starting a Battle
# - ConsolidateBattleView: view for consolidating a Battle
# - EndBattleView: view for ending a Battle
# - UserBattlesListView: view for listing Battles of a User
# - BattleListCreateView: view for listing and creating Battles
# - BattleRetrieveUpdateDestroyView: view for retrieving, updating and deleting a Battle

class StartBattleView(generics.UpdateAPIView):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer

    # Start the battle
    # - Set the start date to the current date
    # - Set the status to 'active'
    def update(self, request, *args, **kwargs):
        battle = self.get_object()
        battle.start_date = timezone.now()
        battle.status = 'active'
        battle.save()

        return Response({'status': 'Battle started'}, status=status.HTTP_200_OK)
    
class ConsolidateBattleView(generics.UpdateAPIView):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer

    # Consolidate the battle
    # - Set the end date to the current date
    # - Set the status to 'consolidation'
    def update(self, request, *args, **kwargs):
        battle = self.get_object()
        battle.end_date = timezone.now()
        battle.status = 'consolidation'
        battle.save()

        return Response({'status': 'Battle consolidated'}, status=status.HTTP_200_OK)

class EndBattleView(generics.UpdateAPIView):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer

    # End the battle
    # - Set the status to 'completed'
    # - Update the status of the tournament
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
# - StudentSubscribedTournamentsListView: view for listing Tournaments subscribed to by a Student
# - StudentSubscribeTournament: view for subscribing a Student to a Tournament
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

    # Subscribe a student to a tournament
    # - Add the student to the subscribed students of the tournament
    # - Send an email to the student
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

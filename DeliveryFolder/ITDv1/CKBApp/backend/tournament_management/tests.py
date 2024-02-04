from django.test import TestCase
from django.contrib.auth.models import User
from user_management.models import EducatorProfile, UserProfile, StudentProfile
from team_github_integration.models import Team
from .models import Tournament, Battle

class TournamentBattleTest(TestCase):
    def setUp(self):
        self.user_attributes = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User',
        }

        self.user_profile_attributes = {
            'role': 'educator',
            'school': 'Test School',
            'profile_icon': 'tiger.svg',
            'github_username': 'testuser',
        }

        self.user = User.objects.create(**self.user_attributes)
        self.userprofile = UserProfile.objects.create(user=self.user, **self.user_profile_attributes)
        self.educator = EducatorProfile.objects.create(user_profile=self.userprofile)

        self.tournament = Tournament.objects.create(
            name='Test Tournament',
            description='Test Description',
            created_by=self.educator,
            start_date='2022-01-01T00:00:00Z',
            end_date='2022-12-31T23:59:59Z'
        )

        self.battle = Battle.objects.create(
            name='Test Battle',
            description='Test Description',
            created_by=self.educator,
            min_students_per_group=1,
            max_students_per_group=5,
            start_date='2022-01-01T00:00:00Z',
            end_date='2022-12-31T23:59:59Z',
            tournament=self.tournament
        )

        self.team = Team.objects.create(
            name='Test Team', 
            battle=self.battle
        )

    def test_tournament_battle_relation(self):
        self.assertEqual(self.battle.tournament, self.tournament)
        self.assertIn(self.battle, self.tournament.battles.all())
        self.assertEqual(self.tournament.created_by, self.educator)
        self.assertEqual(self.battle.created_by, self.educator)
        self.assertIn(self.tournament, self.educator.created_tournaments.all())
        self.assertIn(self.battle, self.educator.created_battles.all())

    def test_invited_educators_and_team_members(self):
        # Create additional users and profiles
        user2 = User.objects.create(username='testuser2', password='testpassword2')
        user_profile2 = UserProfile.objects.create(user=user2, role='educator')
        educator2 = EducatorProfile.objects.create(user_profile=user_profile2)

        user3 = User.objects.create(username='testuser3', password='testpassword3')
        user_profile3 = UserProfile.objects.create(user=user3, role='student')
        student = StudentProfile.objects.create(user_profile=user_profile3)

        # Invite the second educator to the tournament
        self.tournament.invited_Educators.add(educator2)

        # Add the third user to the team
        self.team.members.add(student)

        # Check if the second educator is in the list of invited educators
        self.assertIn(educator2, self.tournament.invited_Educators.all())

        # Check if the third user is in the list of team members
        self.assertIn(student, self.team.members.all())
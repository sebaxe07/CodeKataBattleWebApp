from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import Repository, Commit, Evaluation
from team_github_integration.models import Team
from user_management.models import UserProfile, StudentProfile
from tournament_management.models import Battle
from django.core.exceptions import ObjectDoesNotExist



class webhook(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        repo_name = request.data['repo']
        repo_url = 'https://github.com/' + repo_name
        commit_sha = request.data['commit_sha']
        commit_message = request.data['commit_message']
        commit_author = request.data['author']
        owner = repo_name.split('/')[0]
        test_passed = request.data['tests_passed']
        test_total = request.data['tests_total']


        print("Push event received for", repo_name, "by", commit_author, "with commit message:", commit_message)

        print("=====================================")
        print("Test results for", repo_name)
        print("Tests passed:", test_passed)
        print("Total tests:", test_total)
        print("=====================================")

        if commit_author == 'CodeKataBattleHUB':
            print('Ignoring webhook from CodeKataBattleHUB')
            return HttpResponse('POST request')
        try:
            # Get the UserProfile associated with the GitHub username
            user_profile = UserProfile.objects.get(github_username=commit_author)

            # Get the StudentProfile associated with the UserProfile
            student_profile = StudentProfile.objects.get(user_profile=user_profile)

            # Extract the Battle ID from the repository name
            battle_id = repo_name.split('-')[-1]

            # Get the Battle associated with the Battle ID
            battle = Battle.objects.get(id=battle_id)

            # Get the Team associated with the StudentProfile and Battle
            team = Team.objects.filter(members=student_profile, battle=battle).first()

            print("Creating Repository, Commit and Evaluation objects for", repo_name, "by", commit_author, "with commit message:", commit_message)
            print("Team:", team)
            print("Student Profile:", student_profile)
            print("Battle:", battle)
            print("User Profile:", user_profile)
            repo, _ = Repository.objects.get_or_create(name=repo_name, url=repo_url, owner=owner, team=team)
            commit, _ = Commit.objects.get_or_create(sha=commit_sha, message=commit_message, author=commit_author, repository=repo)

            # Create the Evaluation object
            status = 'S' if test_passed == test_total else 'F'
            evaluation, _ = Evaluation.objects.get_or_create(commit=commit, tests_passed=test_passed, total_test=test_total, status=status)
            evaluation.save()

        except ObjectDoesNotExist:
            print(f'User {commit_author} does not exist')
            return HttpResponse(f'User {commit_author} does not exist')

        return HttpResponse('POST request')
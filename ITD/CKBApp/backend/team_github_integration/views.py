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
from github import Github, InputGitTreeElement
from django.conf import settings
from django.core.mail import send_mail
from pathlib import Path
import os
import zipfile
import tempfile
import logging
import github
import smtplib


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
            
            if team.members.filter(id=student_id).exists():
                return Response({"error": "The student is already part of the team"}, status=status.HTTP_400_BAD_REQUEST)
            
            if student.teams.filter(battle=battle).exists():
                return Response({"error": "The student is already part of a team in this battle"}, status=status.HTTP_400_BAD_REQUEST)
            
            if battle.status != 'registration':
                return Response({"error": "The battle already started"}, status=status.HTTP_400_BAD_REQUEST)
            
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



class StartBattleView(APIView):
    def post(self, request, battle_id):
        # Get the battle and the teams
        battle = Battle.objects.get(id=battle_id)
        teams = battle.teams.all()

        logger = logging.getLogger(__name__)

        software_project_file = battle.software_project.path
        print(f'Software project file: {software_project_file}')  # Print the path of the software project file
        print(f'Battle name: {battle.name}')  # Print the name of the battle
        print(f'Number of teams: {len(teams)}')  # Print the number of teams
        # Initialize the Github object
        github_token = settings.GITHUB_ACCESS_TOKEN
        g = Github(github_token)
        try:
            # Create a new repository
            user = g.get_user()
            repo_name = f"{battle.name}-{battle.id}"
            repo = user.create_repo(repo_name, auto_init=True)

            print(f'Repository created: {repo.html_url}')  # Print the URL of the repository

            def create_tree(repo, base_path, path):
                tree_elements = []
                for root, dirs, files in os.walk(path):
                    for file in files:
                        file_path = os.path.join(root, file)
                        with open(file_path, 'r') as file_data:
                            data = file_data.read()
                        relative_path = os.path.relpath(file_path, base_path).replace("\\", "/")
                        blob = repo.create_git_blob(data, "utf-8")
                        tree_element = InputGitTreeElement(path=relative_path, mode="100644", type="blob", sha=blob.sha)
                        tree_elements.append(tree_element)
                        print(f'File added to tree: {relative_path}')
                return tree_elements

            # Extract the zip file to a temporary directory
            with zipfile.ZipFile(software_project_file, 'r') as zip_ref:
                master_ref = repo.get_git_ref(ref='heads/main')

                with tempfile.TemporaryDirectory() as temp_dir:
                    zip_ref.extractall(temp_dir)

                    # Get the list of top-level items in the temporary directory
                    top_level_items = os.listdir(temp_dir)

                    # If there's only one top-level item and it's a directory, copy its contents
                    if len(top_level_items) == 1 and os.path.isdir(os.path.join(temp_dir, top_level_items[0])):
                        src_dir = os.path.join(temp_dir, top_level_items[0])
                        print(f'Copying contents of directory: {top_level_items[0]}')
                    else:
                        # Otherwise, copy all top-level items
                        print('Copying all top-level items')
                        src_dir = temp_dir

                    # Create blobs for each file and a tree with these blobs
                    tree_elements = create_tree(repo, src_dir, src_dir)
                    programming_language = Path(battle.picture).stem

                    current_dir = os.path.dirname(os.path.realpath(__file__))
                    print(f'Current directory: {current_dir}')
                    # Define the path to the workflow template
                    workflow_template_path = os.path.join(current_dir, "workflow_templates", f"{programming_language}.yml")

                    print(f'Workflow template path: {workflow_template_path}')

                    # Read the content of the workflow template
                    with open(workflow_template_path, "r") as file:
                        workflow_file_content = file.read()

                    blob = repo.create_git_blob(workflow_file_content, "utf-8")
                    workflow_file = InputGitTreeElement(path='.github/workflows/main.yml', mode="100644", type="blob", sha=blob.sha)

                    # Add the workflow file to the tree
                    tree_elements.append(workflow_file)
                    git_tree = repo.create_git_tree(tree_elements, base_tree=repo.get_git_tree(sha='main'))


                print('Tree created' + str(git_tree)) 
                # Create a commit
                commit = repo.create_git_commit(
                    message="Initial commit",
                    tree=repo.get_git_tree(sha=git_tree.sha),
                    parents=[repo.get_git_commit(repo.get_branch('main').commit.sha)],
                )

                # Update the master branch to point to the new commit
                master_ref.edit(sha=commit.sha)

                # Send an email to each team member
                for team in teams:
                    # Construct the fork URL
                    fork_url = f'https://github.com/{repo.owner.login}/{repo.name}/fork'

                    # Construct the list of team member usernames
                    team_members = ', '.join(student.user_profile.github_username for student in team.members.all())

                    # Send the email
                    for student in team.members.all():
                        print(f'Sending email to student: {student.user_profile.user.email}')
                        send_mail(
                            f'Battle {battle.name} Started',
                            f'Hello {student.user_profile.user.first_name}!,\n\n'
                            f'The battle {battle.name} has started. You are part of the team {team.name}.\n'
                            f'Please invite the following team members to your fork: {team_members}\n'
                            f'Make sure to only create the fork of the repository once.\n\n'
                            f'Here is the link to fork the repository: {fork_url}\n\n'
                            f'To activate the GitHub Actions workflow, follow these steps:\n'
                            f'1. Go to your forked repository.\n'
                            f'2. Click on the "Actions" tab.\n'
                            f'3. If you see a message saying "Workflows aren’t being run on this repository", click on "I understand my workflows, go ahead and enable them".\n'
                            f'4. If you see a list of workflows, they are already enabled.\n\n'
                            f'Do not forget to push your changes to the repository so that your project is evaluated automatically.\n\n'
                            f'Note: Please do not change the repository name or the workflow file when creating the fork.\n\n',
                            settings.DEFAULT_FROM_EMAIL,
                            [student.user_profile.user.email],  
                            fail_silently=False,
                        )

        except github.GithubException as e:
            logger.error(f"An error occurred with the GitHub API: {e}")
            if 'repo' in locals():  # Check if the repo was created
                repo.delete()  # Delete the repo
                logger.info(f"Repository {repo_name} deleted due to GitHub API error.")
            return Response({"message": "An error occurred with the GitHub API."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except smtplib.SMTPException as e:
            logger.error(f"An error occurred when sending the email: {e}")
            return Response({"message": "An error occurred when sending the email."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            logger.error(f"An unexpected error occurred: {e}")
            if 'repo' in locals():  # Check if the repo was created
                repo.delete()  # Delete the repo
                print(f"Repository {repo_name} deleted due to unexpected error.")
                logger.info(f"Repository {repo_name} deleted due to unexpected error.")
            return Response({"message": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Battle started successfully"}, status=status.HTTP_200_OK)

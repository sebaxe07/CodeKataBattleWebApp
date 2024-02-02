from django.urls import path
from .views import TeamRemoveMember, TeamListCreateView, TeamRetrieveUpdateDestroyView, UserTeamsListView, TeamMembersListView, PublicTeamsListView, TeamAddMember

urlpatterns = [
    path('teams/', TeamListCreateView.as_view(), name='team-list-create'),
    path('teams/<int:pk>/', TeamRetrieveUpdateDestroyView.as_view(), name='team-retrieve-update-destroy'),
    path('teams/student/<int:user_id>/', UserTeamsListView.as_view(), name='user-teams-list'),
    path('teams/members/<int:team_id>/', TeamMembersListView.as_view(), name='team-members-list'),
    path('teams/battle/public/<int:battle_id>/', PublicTeamsListView.as_view(), name='public-teams-list'),
    path('teams/join/<str:code>/<int:student_id>/<int:battle_id>/', TeamAddMember.as_view(), name='team-add-member'),
    path('teams/leave/<str:code>/<int:student_id>/', TeamRemoveMember.as_view(), name='team-remove-member'),


    # path('teams/add-member/<int:team_id>/<int:user_id>/', TeamAddMember.as_view(), name='team-add-member'),
    # path('teams/battles/<int:team_id>/', TeamBattlesListView.as_view(), name='team-battles-list'),
    # path('teams/add-github-repo/<int:team_id>/<str:repo_name>', TeamAddGithubRepo.as_view(), name='team-add-github-repo'),
    # path('teams/remove-github-repo/<int:team_id>/<str:repo_name>', TeamRemoveGithubRepo.as_view(), name='team-remove-github-repo'),
    # path('teams/github-repos/<int:team_id>', TeamGithubReposListView.as_view(), name='team-github-repos-list'),

    ] 
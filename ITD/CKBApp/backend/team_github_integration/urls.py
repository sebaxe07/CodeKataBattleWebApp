from django.urls import path
from .views import StartBattleView, TeamRemoveMember, TeamListCreateView, TeamRetrieveUpdateDestroyView, UserTeamsListView, TeamMembersListView, PublicTeamsListView, TeamAddMember

# URL patterns for the team_github_integration app
urlpatterns = [
    path('teams/', TeamListCreateView.as_view(), name='team-list-create'),
    path('teams/<int:pk>/', TeamRetrieveUpdateDestroyView.as_view(), name='team-retrieve-update-destroy'),
    path('teams/student/<int:user_id>/', UserTeamsListView.as_view(), name='user-teams-list'),
    path('teams/members/<int:team_id>/', TeamMembersListView.as_view(), name='team-members-list'),
    path('teams/battle/public/<int:battle_id>/', PublicTeamsListView.as_view(), name='public-teams-list'),
    path('teams/join/<str:code>/<int:student_id>/<int:battle_id>/', TeamAddMember.as_view(), name='team-add-member'),
    path('teams/leave/<str:code>/<int:student_id>/', TeamRemoveMember.as_view(), name='team-remove-member'),
    path('battles/start/<int:battle_id>/', StartBattleView.as_view(), name='start_battle'),
    ] 
from django.db import models
from user_management.models import EducatorProfile, StudentProfile
from django.utils import timezone
from tournament_management.models import Battle, Tournament
from team_github_integration.models import Team
from automated_evaluation.models import Evaluation
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Evaluation)
def update_battle_score(sender, instance, created, **kwargs):
    if created:  # only for newly created Evaluation instances
        # Get the Team associated with the Commit
        team = instance.commit.repository.team

        print("Updating BattleScore for", team, "with", instance.tests_passed, "tests passed out of", instance.total_test, "total tests")
        # Get the Battle associated with the Team
        battle = team.battle

        # Get or create the BattleScore associated with the Team and Battle
        battle_score, _ = BattleScore.objects.get_or_create(team=team, battle=battle)

        # Update the BattleScore
        new_functional_score = (instance.tests_passed / instance.total_test) * 100


        # Calculate the timeliness score
        time_passed = instance.timestamp - battle.start_date
        total_time = battle.end_date - battle.start_date
        time_passed_in_minutes = time_passed.total_seconds() / 60
        total_time_in_minutes = total_time.total_seconds() / 60
        new_timeliness_score = max(0, 100 - (time_passed_in_minutes / total_time_in_minutes) * 100)
        print("Functional score:", new_functional_score)
        print("Timeliness score:", new_timeliness_score)
        new_manual_score = 0  
        battle_score.update_score(new_functional_score, new_timeliness_score, new_manual_score)


@receiver(post_save, sender=Battle)
def update_tournament_score(sender, instance, **kwargs):
    if instance.status == "completed":
        print("Updating TournamentScore for", instance.tournament)
        for team in instance.teams.all():
            print("Updating TournamentScore for", team.name)  
            for student in team.members.all():
                print("Updating TournamentScore for", student.user_profile.user.username)
                tournament_score, created = TournamentScore.objects.get_or_create(student=student, tournament=instance.tournament)
                tournament_score.update_score()


class BattleScore(models.Model):
    battle = models.ForeignKey(Battle, on_delete=models.CASCADE, related_name='battle_scores')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_scores')
    functional_score = models.PositiveIntegerField(default=0)
    timeliness_score = models.PositiveIntegerField(default=0)
    manual_score = models.PositiveIntegerField(default=0)
    total_score = models.PositiveIntegerField(default=0)
    is_manual_evaluation = models.BooleanField(default=False)

    def update_score(self, new_functional_score, new_timeliness_score, new_manual_score=0):
        precision_factor = 10  
        self.functional_score = round(new_functional_score * precision_factor)
        self.timeliness_score = round(new_timeliness_score * precision_factor)
        self.manual_score = round(new_manual_score * precision_factor)
        self.total_score = self.functional_score + self.timeliness_score
        print("Updating total score for", self.team)
        print("Functional score:", self.functional_score)
        print("Timeliness score:", self.timeliness_score)
        print("Manual score:", self.manual_score)
        if self.is_manual_evaluation:
            self.total_score += self.manual_score
            self.total_score = round((self.total_score / (300.0 * precision_factor)) * 100)
        else:
            self.total_score = round((self.total_score / (200.0 * precision_factor)) * 100)
        print("Total score:", self.total_score)
        self.functional_score = round((self.functional_score / (100.0 * precision_factor)) * 100)
        self.timeliness_score = round((self.timeliness_score / (100.0 * precision_factor)) * 100)
        self.manual_score = round((self.manual_score / (100.0 * precision_factor)) * 100)
        self.save()
        

class TournamentScore(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tournament_scores')
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='student_scores')
    total_score = models.PositiveIntegerField(default=0)

    def update_score(self):
        battle_scores = BattleScore.objects.filter(team__members=self.student, battle__tournament=self.tournament)
        self.total_score = sum(score.total_score for score in battle_scores)
        self.save()
from django.db import models
from user_management.models import StudentProfile
from tournament_management.models import Battle

class Team(models.Model):
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(StudentProfile, related_name='teams')
    battle = models.ForeignKey(Battle, on_delete=models.CASCADE, related_name='teams')

    def __str__(self):
        return self.name
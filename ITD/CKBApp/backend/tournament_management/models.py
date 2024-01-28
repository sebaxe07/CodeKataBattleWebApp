from django.db import models
from user_management.models import StudentProfile, EducatorProfile

class Tournament(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(EducatorProfile, on_delete=models.CASCADE, related_name='created_tournaments')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    invited_Educators = models.ManyToManyField(EducatorProfile, related_name='invited_tournaments')
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Battle(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(EducatorProfile, on_delete=models.CASCADE, related_name='created_battles')
    min_students_per_group = models.PositiveIntegerField()
    max_students_per_group = models.PositiveIntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='battles')
    active = models.BooleanField(default=True)


    def __str__(self):
        return self.name
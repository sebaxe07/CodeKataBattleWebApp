from django.db import models
from team_github_integration.models import Team

class Repository(models.Model):
    name = models.CharField(max_length=200)
    url = models.URLField()
    owner = models.CharField(max_length=200)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True)

class Commit(models.Model):
    sha = models.CharField(max_length=40)
    message = models.TextField()
    author = models.CharField(max_length=200)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)

class Evaluation(models.Model):
    STATUS_CHOICES = [
        ('S', 'Success'),
        ('F', 'Failure'),
    ]
    commit = models.ForeignKey(Commit, on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='F')
    tests_passed = models.PositiveIntegerField(blank=True)
    total_test = models.PositiveIntegerField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
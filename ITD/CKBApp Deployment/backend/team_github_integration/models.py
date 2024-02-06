from django.db import models
from user_management.models import StudentProfile
from tournament_management.models import Battle
import random, string

# Function to generate a unique code for a Team
def generate_unique_code():
    while True:
        letters = ''.join(random.choice(string.ascii_uppercase) for _ in range(3))
        numbers = ''.join(random.choice(string.digits) for _ in range(3))
        code = letters + numbers
        if not Team.objects.filter(code=code).exists():
            return code
        
# Model for Team
# - code: unique code for the team
# - name: name of the team
# - members: members of the team
# - is_private: whether the team is private or not
# - battle: the Battle associated with the team

class Team(models.Model):
    code = models.CharField(max_length=6, default=generate_unique_code, unique=True)    
    name = models.CharField(max_length=255)
    members = models.ManyToManyField(StudentProfile, related_name='teams')
    is_private = models.BooleanField(default=False)
    battle = models.ForeignKey(Battle, on_delete=models.CASCADE, related_name='teams')

    def __str__(self):
        return self.name
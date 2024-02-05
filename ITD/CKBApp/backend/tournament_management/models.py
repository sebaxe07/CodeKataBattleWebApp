from django.db import models
from user_management.models import EducatorProfile, StudentProfile
from django.utils import timezone

### Model for Tournament
# - name: name of the tournament
# - description: description of the tournament
# - picture: picture of the tournament
# - created_by: educator who created the tournament
# - start_date: start date of the tournament
# - end_date: end date of the tournament
# - invited_Educators: educators invited to the tournament
# - subscribed_Students: students subscribed to the tournament
# - status: status of the tournament (Registration/Active/Consolidation/Completed)
class Tournament(models.Model):
    STATUS_CHOICES = [
        ('registration', 'Registration'),
        ('active', 'Active'),
        ('consolidation', 'Consolidation'),
        ('completed', 'Completed'),
    ]
    name = models.CharField(max_length=255)
    description = models.TextField()
    picture = models.CharField(max_length=100, default='binaryIcon.svg')
    created_by = models.ForeignKey(EducatorProfile, on_delete=models.CASCADE, related_name='created_tournaments')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    invited_Educators = models.ManyToManyField(EducatorProfile, related_name='invited_tournaments', blank=True)
    subscribed_Students = models.ManyToManyField(StudentProfile, related_name='subscribed_tournaments', blank=True)
    status = models.CharField(max_length=14, choices=STATUS_CHOICES, default='registration')

    # Update the status of the tournament based on the current date
    def update_status(self):
        now = timezone.now()
        print("Updating status for tournament", self.name, "at", now)
        if now < self.start_date:
            self.status = 'registration'
        elif self.start_date <= now <= self.end_date:
            self.status = 'active'
        else:
            self.status = 'completed'
        self.save()

    def __str__(self): 
        return self.name

### Model for Battle
# - name: name of the battle
# - description: description of the battle
# - created_by: educator who created the battle
# - min_students_per_group: minimum number of students per group
# - max_students_per_group: maximum number of students per group
# - start_date: start date of the battle
# - end_date: end date of the battle
# - picture: picture of the battle
# - software_project: software project for the battle
# - tournament: the Tournament associated with the battle
# - status: status of the battle (Registration/Active/Consolidation/Completed)
class Battle(models.Model):
    STATUS_CHOICES = [
        ('registration', 'Registration'),
        ('active', 'Active'),
        ('consolidation', 'Consolidation'),
        ('completed', 'Completed'),
    ]
    name = models.CharField(max_length=255)
    description = models.TextField() 
    created_by = models.ForeignKey(EducatorProfile, on_delete=models.CASCADE, related_name='created_battles')
    min_students_per_group = models.PositiveIntegerField()
    max_students_per_group = models.PositiveIntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    picture = models.CharField(max_length=100, default='binaryIcon.svg')
    software_project = models.FileField(upload_to='software_projects/')
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='battles')
    status = models.CharField(max_length=14, choices=STATUS_CHOICES, default='registration')

    # Update the status of the battle based on the current date
    def update_status(self):
        now = timezone.now()
        print("Updating status for battle", self.name, "at", now)
        if now < self.start_date:
            self.status = 'registration'
        elif self.start_date <= now <= self.end_date:
            self.status = 'active'
        else:
            self.status = 'completed'
        self.save()

    def __str__(self):
        return self.name
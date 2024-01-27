from django.contrib import admin
from .models import UserProfile, EducatorProfile, StudentProfile


admin.site.register(UserProfile)
admin.site.register(EducatorProfile)
admin.site.register(StudentProfile)
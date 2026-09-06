from django.contrib import admin
from .models import Application, JobOffer, UserProfile

admin.site.register(Application)
admin.site.register(JobOffer)
admin.site.register(UserProfile)
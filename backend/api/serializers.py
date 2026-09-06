from rest_framework import serializers
from .models import JobOffer, Application

class JobOfferSerializer(serializers.ModelSerializer):
    applications_count = serializers.SerializerMethodField()

    class Meta:
        model = JobOffer
        fields = ['id', 'title', 'description', 'company', 'location', 'created_at', 'applications_count']

    def get_applications_count(self, obj):
        return obj.applications.count()

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile, JobOffer, Application

class JobOfferListCreateView(APIView):
    def get(self, request):
        offers = JobOffer.objects.all()
        data = [{
            "id": o.id,
            "title": o.title,
            "description": o.description,
            "company": o.company,
            "location": o.location,
            "created_at": o.created_at,
            "applications_count": o.applications.count()
        } for o in offers]
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        title = request.data.get('title')
        description = request.data.get('description')
        company = request.data.get('company')
        location = request.data.get('location')

        offer = JobOffer.objects.create(
            title=title,
            description=description,
            company=company,
            location=location
        )
        return Response({"message": "Offre publiée avec succès !", "id": offer.id}, status=status.HTTP_201_CREATED)

class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        password = request.data.get('password')
        role = request.data.get('role', 'candidat')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        company_name = request.data.get('company_name', '')
        
        if UserProfile.objects.filter(email__iexact=email).exists() or User.objects.filter(email__iexact=email).exists():
            return Response({"error": "Cet email est déjà utilisé."}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        
        UserProfile.objects.create(
            user=user,
            email=email,
            password=password,
            role=role,
            first_name=first_name,
            last_name=last_name,
            company_name=company_name
        )
        
        return Response({"message": "Utilisateur créé et relié avec succès !"}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        password = request.data.get('password')
        
        try:
            user_profile = UserProfile.objects.get(email__iexact=email)
            if user_profile.password == password:
                return Response({
                    "email": user_profile.email,
                    "role": user_profile.role,
                    "firstName": user_profile.first_name,
                    "lastName": user_profile.last_name,
                    "companyName": user_profile.company_name
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Mot de passe incorrect."}, status=status.HTTP_400_BAD_REQUEST)
        except UserProfile.DoesNotExist:
            return Response({"error": "Utilisateur introuvable."}, status=status.HTTP_404_NOT_FOUND)

class UserListView(APIView):
    def get(self, request):
        users = UserProfile.objects.all()
        data = [{
            "id": u.id,
            "email": u.email,
            "role": u.role,
            "firstName": u.first_name,
            "lastName": u.last_name,
            "companyName": u.company_name
        } for u in users]
        return Response(data, status=status.HTTP_200_OK)

class ApplicationCreateView(APIView):
    def post(self, request):
        job_id = request.data.get('job_id')
        candidate_email = request.data.get('candidate_email')
        cv = request.FILES.get('cv')
        cover_letter = request.data.get('cover_letter')
        
        try:
            job_offer = JobOffer.objects.get(id=job_id)
            application = Application.objects.create(
                job_offer=job_offer,
                candidate_email=candidate_email,
                cv=cv,
                cover_letter=cover_letter
            )
            return Response({"message": "Candidature envoyée avec succès !", "id": application.id}, status=status.HTTP_201_CREATED)
        except JobOffer.DoesNotExist:
            return Response({"error": "Offre d'emploi introuvable."}, status=status.HTTP_404_NOT_FOUND)

class ApplicationListView(APIView):
    def get(self, request):
        company_name = request.GET.get('company')
        if company_name:
            applications = Application.objects.filter(job_offer__company__icontains=company_name)
        else:
            applications = Application.objects.all()
            
        data = [{
            "id": app.id,
            "job_title": app.job_offer.title,
            "company": app.job_offer.company,
            "candidate_email": app.candidate_email,
            "cv_url": app.cv.url if app.cv else None,
            "cv_name": app.cv.name.split('/')[-1] if app.cv else "",
            "cover_letter": app.cover_letter
        } for app in applications]
        return Response(data, status=status.HTTP_200_OK)
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import get_user_model
from django.http import HttpResponse

# Vue temporaire pour créer l'admin en ligne
def creer_admin_temporaire(request):
    User = get_user_model()
    email = "ckinohrnjr@gmail.com"  # Ton email
    password = "mets_ton_mot_de_passe_ici"  # Remplace par ton mot de passe sécurisé
    
    if not User.objects.filter(email=email).exists():
        User.objects.create_superuser(username="admin_render", email=email, password=password)
        return HttpResponse(f"Succès ! Superutilisateur créé pour {email}. Tu peux te connecter sur /admin/")
    else:
        user = User.objects.get(email=email)
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return HttpResponse(f"Le compte {email} existait déjà, son mot de passe a été mis à jour avec succès !")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('creation-urgente-admin/', creer_admin_temporaire), # <- Route temporaire
]

# Permet de s'assurer que les fichiers statiques et media sont bien pris en compte
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
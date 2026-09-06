from django.urls import path
from .views import (
    RegisterView, 
    LoginView, 
    JobOfferListCreateView, 
    ApplicationCreateView,
    ApplicationListView,
    UserListView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('jobs/', JobOfferListCreateView.as_view(), name='job-list-create'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('applications/', ApplicationListView.as_view(), name='application-list'),           # GET pour lister les candidatures
    path('applications/create/', ApplicationCreateView.as_view(), name='application-create'), # POST pour créer une candidature
]
from django.urls import path
from .views import register_view, user_profile_view, login_view
from . import views

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('profile/', user_profile_view, name='profile'),
]

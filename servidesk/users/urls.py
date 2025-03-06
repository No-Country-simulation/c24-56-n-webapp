from django.urls import path
from .views import (
    register_view,
    user_profile_view,
    login_view,
    password_reset_view,
    email_verification_view,
)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('profile/', user_profile_view, name='profile'),
    path('password-reset/', password_reset_view, name='password_reset'),
    path('verify-email/', email_verification_view, name='verify_email'),
]
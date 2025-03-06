from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from .models import CustomUser

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def populate_user(self, request, sociallogin, data):
        user = super().populate_user(request, sociallogin, data)
        user.first_name = data.get('first_name', '')
        user.last_name = data.get('last_name', '')
        user.rol = CustomUser.CLIENTE  # Asigna un rol predeterminado
        return user
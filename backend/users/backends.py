from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import BlacklistedToken

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        user_auth = super().authenticate(request)
        if user_auth is not None:
            user, token = user_auth
            if BlacklistedToken.objects.filter(token=str(token)).exists():
                return None  # Token inválido
        return user_auth
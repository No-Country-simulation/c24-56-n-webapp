from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse  # Importa JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import BlacklistedToken

class BlacklistMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Verifica si el token está en la lista negra
        auth = JWTAuthentication()
        try:
            header = auth.get_header(request)
            if header is not None:
                raw_token = auth.get_raw_token(header)
                if BlacklistedToken.objects.filter(token=raw_token).exists():
                    return JsonResponse({"error": "Token inválido."}, status=401)  # Usa JsonResponse
        except:
            pass
        return None
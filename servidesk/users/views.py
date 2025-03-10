from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomUserSerializer
from dj_rest_auth.registration.views import RegisterView

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    """
    View para obtener el perfil del usuario autenticado.
    """
    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)
    
    user = request.user
    serializer = CustomUserSerializer(user)
    return Response(serializer.data)

from django.conf import settings
from django.http import HttpResponseRedirect

from .serializers import CustomUserSerializer

class CustomRegisterView(RegisterView):
    serializer_class = CustomUserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        return user

def email_confirm_redirect(request, key):
    return HttpResponseRedirect(
        f"{settings.EMAIL_CONFIRM_REDIRECT_BASE_URL}{key}/"
    )

def password_reset_confirm_redirect(request, uidb64, token):
    return HttpResponseRedirect(
        f"{settings.PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL}{uidb64}/{token}/"
    )
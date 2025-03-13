from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from .serializers import UserRegisterSerializer, UserProfileSerializer
from datetime import timedelta
from .models import ActiveToken, BlacklistedToken
from django.contrib.auth import get_user_model
from django.db import transaction

class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if self.context['request'].data.get('remember_me'):
            # Aumentar la duración del token si "Remember Me" está marcado
            self.token.set_exp(lifetime=timedelta(days=7))  # Ejemplo: 7 días
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # Llama al método post de la clase base para obtener la respuesta
        response = super().post(request, *args, **kwargs)
        
        # Verifica si la respuesta es exitosa (código 200)
        if response.status_code == 200:
            # Obtén el email del usuario desde la solicitud
            email = request.data.get('email')
            
            # Busca el usuario en la base de datos
            User = get_user_model()
            user = User.objects.get(email=email)
            
            # Obtén el access_token y el refresh_token de la respuesta
            access_token = response.data['access']
            refresh_token = response.data['refresh']
            
            # Registra ambos tokens en la tabla ActiveToken
            ActiveToken.objects.create(user=user, token=access_token)
            ActiveToken.objects.create(user=user, token=refresh_token)
        
        return response

class LogoutView(APIView):
    def post(self, request):
        try:
            access_token = request.data.get('access_token')
            refresh_token = request.data.get('refresh_token')

            # Verifica que ambos tokens estén presentes
            if not access_token or not refresh_token:
                return Response(
                    {"error": "Se requieren tanto el access_token como el refresh_token."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Verifica si los tokens ya están en la lista negra
            if (BlacklistedToken.objects.filter(token=access_token).exists() or
                BlacklistedToken.objects.filter(token=refresh_token).exists()):
                return Response(
                    {"error": "Uno o ambos tokens ya han sido invalidados."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Usar una transacción para garantizar atomicidad
            with transaction.atomic():
                # Almacena ambos tokens en la lista negra
                BlacklistedToken.objects.create(token=access_token)
                BlacklistedToken.objects.create(token=refresh_token)

                # Elimina ambos tokens de la tabla ActiveToken
                ActiveToken.objects.filter(token__in=[access_token, refresh_token]).delete()

            return Response(
                {"message": "Sesión cerrada exitosamente."},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": f"Error al cerrar la sesión: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ActiveSessionsView(APIView):
    def get(self, request):
        # Obtén todos los tokens activos que no están en la lista negra
        active_tokens = ActiveToken.objects.exclude(token__in=BlacklistedToken.objects.values_list('token', flat=True))
        
        # Formatea la respuesta
        sessions = []
        for token in active_tokens:
            sessions.append({
                "user": token.user.email,
                "token": token.token,
                "created_at": token.created_at
            })
        
        return Response({"active_sessions": sessions}, status=status.HTTP_200_OK)
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder

    def get(self, request):
        user = request.user  # Obtiene el usuario autenticado
        serializer = UserProfileSerializer(user)  # Serializa los datos del usuario
        return Response(serializer.data)
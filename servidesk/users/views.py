from django.core.mail import send_mail
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser
from .serializers import CustomUserSerializer, EmailVerificationSerializer, PasswordResetSerializer


@api_view(['POST'])
def login_view(request):
    """Inicia sesión y devuelve tokens JWT si las credenciales son válidas."""
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    
    return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """Registra un nuevo usuario y envía un correo de verificación."""
    serializer = CustomUserSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        user.is_active = False  # Desactivar la cuenta hasta que se verifique el correo
        user.save()

        # Generar el token de verificación
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Enviar el correo de verificación
        verification_link = f'http://localhost:8080/verify-email/{uid}/{token}/'
        send_mail(
            'Verificación de Correo Electrónico',
            f'Sigue este enlace para verificar tu correo: {verification_link}',
            'from@example.com',
            [user.email],
            fail_silently=False,
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    """Obtiene el perfil del usuario autenticado."""
    user = request.user
    serializer = CustomUserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
def unauthenticated_profile_view(request):
    """Prueba de acceso no autenticado."""
    return Response({'detail': 'Authentication credentials were not provided.'},
                    status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_view(request):
    """Inicia el proceso de restablecimiento de contraseña."""
    serializer = PasswordResetSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        try:
            user = CustomUser.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            send_mail(
                'Restablecimiento de contraseña',
                f'Sigue este enlace para restablecer tu contraseña: /reset-password-confirm/{uid}/{token}/',
                'from@example.com',
                [user.email],
            )
            return Response({'detail': 'Correo de restablecimiento enviado'}, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model

@api_view(['POST'])
@permission_classes([AllowAny])
def email_verification_view(request):
    """Verifica el correo y activa la cuenta del usuario."""
    serializer = EmailVerificationSerializer(data=request.data)

    if serializer.is_valid():
        token = serializer.validated_data['token']
        uidb64 = serializer.validated_data['uid']  # Asegúrate de incluir 'uid' en el serializer

        try:
            # Decodificar el UID
            uid = urlsafe_base64_decode(uidb64).decode()
            User = get_user_model()
            user = User.objects.get(pk=uid)

            # Verificar el token
            if default_token_generator.check_token(user, token):
                user.is_active = True  # Activar la cuenta
                user.save()
                return Response({'detail': 'Correo verificado con éxito'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Token inválido o expirado'}, status=status.HTTP_400_BAD_REQUEST)

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Token inválido o usuario no encontrado'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import CustomUser
import logging

logger = logging.getLogger(__name__)

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'phone', 'role', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_role(self, value):
        if value not in dict(CustomUser.ROLE_CHOICES).keys():
            raise serializers.ValidationError("Rol no válido.")
        return value

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class CustomRegisterSerializer(RegisterSerializer):
    # Elimina el campo 'username' del formulario de registro
    username = None

    # Define los campos personalizados que necesitas
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    role = serializers.CharField(required=True)

    def validate_role(self, value):
        if value not in dict(CustomUser.ROLE_CHOICES).keys():
            raise serializers.ValidationError("Rol no válido.")
        return value

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data.update({
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'phone': self.validated_data.get('phone', ''),
            'role': self.validated_data.get('role', ''),
        })
        return data
    
    def save(self, request):
        logger.info("Llamando al método save del serializador personalizado")
        logger.info(f"Datos limpios: {self.get_cleaned_data()}")
        logger.info(f"Request: {request}")
        user = super().save(request)
        logger.info(f"Usuario creado: {user}")
        logger.info(f"¿Correo de verificación enviado? {user.emailaddress_set.exists()}")
        return user
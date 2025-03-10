from rest_framework import serializers
from .models import CustomUser
from allauth.account.utils import send_email_confirmation
from allauth.account.models import EmailAddress

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo CustomUser.
    """
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'password_confirmation', 'first_name', 'last_name', 'rol']
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'rol': {'required': True},
        }

    def validate_rol(self, rol):
        valid_roles = [choice[0] for choice in CustomUser.ROL_CHOICES]
        if rol not in valid_roles:
            raise serializers.ValidationError("El rol no es válido.")
        return rol
    
    def validate_email(self, email):
        if EmailAddress.objects.filter(email=email, verified=True).exists():
            raise serializers.ValidationError("Este correo ya está en uso.")
        return email

    def validate(self, attrs):
        # Validar que las contraseñas coincidan
        if attrs['password'] != attrs['password_confirmation']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        return attrs

    def create(self, validated_data):
        # Eliminar la confirmación de contraseña antes de crear el usuario
        validated_data.pop('password_confirmation')
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            rol=validated_data['rol'],
        )
        # Enviar correo de confirmación
        send_email_confirmation(self.context['request'], user)
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.rol = validated_data.get('rol', instance.rol)

        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance
from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo CustomUser.
    """
    password = serializers.CharField(write_only=True)  # Asegúrate de incluir el campo password

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'password', 'first_name', 'last_name', 'rol']
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'rol': {'required': True},
            'username': {'required': False},  # Opcional si decides mantenerlo
        }

    def create(self, validated_data):
        """
        Crea y retorna un nuevo usuario con los datos validados.
        """
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            rol=validated_data['rol'],
            username=validated_data.get('username', None),  # Manejo opcional
        )
        return user

    def update(self, instance, validated_data):
        """
        Actualiza y retorna un usuario existente con los datos validados.
        """
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)  # Manejo opcional
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.rol = validated_data.get('rol', instance.rol)

        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance
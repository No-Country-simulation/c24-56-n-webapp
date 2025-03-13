from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser

User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'phone_number', 'email',
            'password', 'confirm_password', 'role',
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return attrs
    
    def validate_role(self, value):
        # Verifica que el valor de "role" esté en las opciones permitidas
        valid_roles = [choice[0] for choice in CustomUser.ROLE_CHOICES]
        if value not in valid_roles:
            raise serializers.ValidationError("Rol no válido.")
        return value

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop('password', None)
        return representation
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'phone_number', 'role']
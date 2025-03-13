from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError
from .managers import CustomUserManager

class CustomUser(AbstractUser):
    
    username = None
    first_name = models.CharField(max_length=30, verbose_name='Nombre')
    last_name = models.CharField(max_length=30, verbose_name='Apellido')
    phone_number = models.CharField(max_length=15, verbose_name='Teléfono')
    email = models.EmailField(unique=True, verbose_name='Email')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number']

    ADMINISTRADOR = "A"
    TECNICO = "T"
    CLIENTE = "C"
    ROLE_CHOICES = [
        (ADMINISTRADOR, "Administrador"),
        (TECNICO, "Técnico"),
        (CLIENTE, "Cliente"),
    ]

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=CLIENTE, verbose_name='Rol')

    objects = CustomUserManager()
    
    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"
    
    def clean(self):
        super().clean()
        if self.role not in [choice[0] for choice in self.ROLE_CHOICES]:
            raise ValidationError({"role": "Rol no válido."})
        
class BlacklistedToken(models.Model):
    token = models.CharField(max_length=500, unique=True)  # Almacena el token JWT
    timestamp = models.DateTimeField(auto_now_add=True)  # Fecha y hora de creación

    def __str__(self):
        return f"Token invalidado el {self.timestamp}"

class ActiveToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='active_tokens')
    token = models.CharField(max_length=500, unique=True)  # Almacena el token JWT
    created_at = models.DateTimeField(auto_now_add=True)  # Fecha y hora de creación

    def __str__(self):
        return f"Token activo para {self.user.email} creado el {self.created_at}"
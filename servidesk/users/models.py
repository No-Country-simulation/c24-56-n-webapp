from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.core.exceptions import ValidationError

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        if not extra_fields.get('first_name'):
            raise ValueError('El nombre es obligatorio')
        if not extra_fields.get('last_name'):
            raise ValueError('El apellido es obligatorio')
        if 'rol' not in extra_fields:
            raise ValueError('El rol es obligatorio')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        if password:
            user.set_password(password)
        else:
            raise ValueError('La contraseña es obligatoria')

        user.save(using=self._db)
        return user

class CustomUser(AbstractUser):
    CLIENTE = 'C'
    TECNICO = 'T'
    ADMINISTRADOR = 'A'

    ROL_CHOICES = [
        (CLIENTE, 'Cliente'),
        (TECNICO, 'Técnico'),
        (ADMINISTRADOR, 'Administrador'),
    ]

    email = models.EmailField(unique=True, null=False, blank=False)
    rol = models.CharField(max_length=20, choices=ROL_CHOICES, default=CLIENTE)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'rol']

    objects = CustomUserManager()

    def clean(self):
        super().clean()
        valid_roles = [choice[0] for choice in self.ROL_CHOICES]
        if self.rol not in valid_roles:
            raise ValidationError({'rol': 'El rol no es válido'})

    def __str__(self):
        return f'{self.email} ({self.get_rol_display()})'
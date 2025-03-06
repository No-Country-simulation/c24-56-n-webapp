from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.core.exceptions import ValidationError

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Crea y guarda un usuario con el email y la contraseña proporcionados.
        """
        if not email:
            raise ValueError('El email es obligatorio')
        if not extra_fields.get('first_name'):
            raise ValueError('El nombre es obligatorio')
        if not extra_fields.get('last_name'):
            raise ValueError('El apellido es obligatorio')
        if not extra_fields.get('rol'):
            raise ValueError('El rol es obligatorio')

        valid_roles = [choice[0] for choice in CustomUser.ROL_CHOICES]
        if extra_fields.get('rol') not in valid_roles:
            raise ValueError('El rol no es válido')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Crea y guarda un superusuario con el email y la contraseña proporcionados.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    CLIENTE = 'C'
    TECNICO = 'T'
    ADMINISTRADOR = 'A'

    ROL_CHOICES = [
        (CLIENTE, 'Cliente'),
        (TECNICO, 'Técnico'),
        (ADMINISTRADOR, 'Administrador'),
    ]

    username = None  # Elimina el campo username
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'rol']

    rol = models.CharField(max_length=20, choices=ROL_CHOICES, default=CLIENTE)

    objects = CustomUserManager()

    def clean(self):
        """
        Valida que el rol sea uno de los valores permitidos.
        """
        super().clean()
        valid_roles = [choice[0] for choice in self.ROL_CHOICES]
        if self.rol not in valid_roles:
            raise ValidationError({'rol': 'El rol no es válido'})

    def __str__(self):
        return f'{self.email} ({self.get_rol_display()})'
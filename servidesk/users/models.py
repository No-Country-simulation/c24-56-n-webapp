from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    CLIENTE = 'C'
    TECNICO = 'T'
    ADMINISTRADOR = 'A'

    ROL_CHOICES = [
        (CLIENTE, 'Cliente'),
        (TECNICO, 'Técnico'),
        (ADMINISTRADOR, 'Administrador'),
    ]

    username = None
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'rol']

    rol = models.CharField(max_length=20, choices=ROL_CHOICES, default=CLIENTE)

    def __str__(self):
        return f'{self.email} ({self.get_rol_display()})'
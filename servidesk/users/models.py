from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import CustomUserManager

class CustomUser(AbstractUser):

    ADMINISTRADOR = "A"
    TECNICO = "T"
    CLIENTE = "C"

    ROLE_CHOICES = {
        ADMINISTRADOR: "Administrador",
        TECNICO: "Técnico",
        CLIENTE: "Cliente",
    }

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    phone = models.CharField(max_length=15)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=CLIENTE)

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone', 'role']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
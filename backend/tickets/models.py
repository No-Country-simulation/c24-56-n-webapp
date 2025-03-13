from django.db import models
from django.conf import settings

# Create your models here.
class Ticket(models.Model):
    n_ticket = models.AutoField(primary_key = True)
    # titulo
    titulo = models.CharField(max_length=200)
    descripcion = models.CharField(max_length = 5000)
    # Estados 
    ESTADO_CHOICES = [
    ('PENDIENTE','Pendiente'),
    ('EN_PROGRESO', 'En progreso'),
    ('RESUELTO', 'Resuelto'),
    ]

    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='PENDIENTE')
    # importar de usuario esperar a Allan
    cliente = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tickets_creados')
    # importar de tecnico esperar a Allan
    tecnico = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete= models.SET_NULL, related_name='tickets_asignados', null = True, blank= True)
    
    # categoria
    CATEGORIA_CHOICES = [
        ("SOFTWARE", "Software"),
        ("HARDWARE", "Hardware"),
        ("PERIFERICO", "Periferico"),
    ]
    
    categoria = models.CharField(max_length=255, choices=CATEGORIA_CHOICES)
    fecha_creacion = models.DateTimeField(auto_now_add = True)
    fecha_actualizacion = models.DateTimeField(auto_now = True)
    
    def __str__(self):
        return f'Numero de ticket{self.n_ticket}, Descripción: {self.descripcion}, Estado: {self.estado}'
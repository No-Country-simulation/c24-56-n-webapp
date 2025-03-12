from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = [
            "n_ticket",
            "titulo",
            "descripcion",
            "estado",
            "cliente",
            "tecnico",
            "categoria",
            "fecha_creacion",
        ]
    

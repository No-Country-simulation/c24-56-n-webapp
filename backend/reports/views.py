from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from tickets.models import Ticket

class ReportesTicketsView(APIView):
    def get(self, request):
        # Inicializar contadores
        estados = {
            'RESUELTO': 0,
            'PENDIENTE': 0,
            'EN_PROGRESO': 0
        }
        categorias = {
            'HARDWARE': 0,
            'SOFTWARE': 0,
            'PERIFERICO': 0,
        }
        
        # Obtener todos los tickets
        tickets = Ticket.objects.all()
        
        # Contar los tickets por estado y categoría
        for ticket in tickets:
            estado = ticket.estado
            categoria = ticket.categoria
            
            if estado in estados.keys():
                estados[estado] += 1
            
            if categoria in categorias.keys():
                categorias[categoria] += 1
        
        # Crear la respuesta con los contadores
        resultado = {
            'estados': estados,
            'categorias': categorias
        }
        
        return Response(resultado, status=status.HTTP_200_OK)

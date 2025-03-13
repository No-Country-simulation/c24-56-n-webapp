from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from tickets.models import Ticket  

class ReportesTicketsView(APIView):
    def get(self, request):
        # Inicializar contadores
        estados = {
            'resueltos': 0,
            'pendientes': 0,
            'en_progreso': 0
        }
        categorias = {
            'hardware': 0,
            'software': 0,
            'red': 0,
            'accesos': 0,
            'dispositivos': 0
        }
        
        # Obtener todos los tickets
        tickets = Ticket.objects.all()
        
        # Contar los tickets por estado y categoría
        for ticket in tickets:
            estado = ticket.estado
            categoria = ticket.categoria
            
            if estado in estados:
                estados[estado] += 1
            
            if categoria in categorias:
                categorias[categoria] += 1
        
        # Crear la respuesta con los contadores
        resultado = {
            'estados': estados,
            'categorias': categorias
        }
        
        return Response(resultado, status=status.HTTP_200_OK)

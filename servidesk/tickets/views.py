from rest_framework import generics
from .models import Ticket
from .serializers import TicketSerializer

class TicketListCreate(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
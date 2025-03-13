from django.urls import path
from .views import ReportesTicketsView

app_name = 'tickets'

urlpatterns = [
    path('tickets/', ReportesTicketsView.as_view(), name='reportes_tickets'),
]

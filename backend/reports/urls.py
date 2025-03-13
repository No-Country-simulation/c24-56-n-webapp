from django.urls import path
from .views import ReportesTicketsView

app_name = 'reports'

urlpatterns = [
    path('', ReportesTicketsView.as_view(), name='reportes_tickets'),
]

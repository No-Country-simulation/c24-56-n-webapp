from django.urls import path
from .views import ticket_list, ticket_create, ticket_detail

app_name = 'tickets'

urlpatterns = [
    path('', ticket_list, name='ticket-list'),
    path('crear/', ticket_create, name='ticket-create'),
    path('<int:pk>/', ticket_detail, name='ticket-detail'),
]

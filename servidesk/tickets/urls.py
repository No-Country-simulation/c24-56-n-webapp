from .views import TicketListCreate
from django.urls import path

app_name = 'tickets'

urlpatterns = [
    # path('', views.index, name='tickets_index'),
    # path("crear/", views.crear_ticket, name="tickets_crear"),
    path('crear/', TicketListCreate.as_view(), name='ticket-list-create'),
]
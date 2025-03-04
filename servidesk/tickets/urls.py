from . import views
from django.urls import path

app_name = 'tickets'

urlpatterns = [
        path('', views.index, name='tickets_index'),
]



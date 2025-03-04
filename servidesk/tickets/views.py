from django.shortcuts import render

from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse('Conexion con la aplicacion realizada con exito respondiendo desde views')
    

    

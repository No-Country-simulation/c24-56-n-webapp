from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('api/users/', include('users.urls')),
    path('tickets/', include('tickets.urls')),
    path('admin/', admin.site.urls),
    path('reports/', include('reports.urls')),
]
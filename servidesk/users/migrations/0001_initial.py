# users/migrations/0001_initial.py
from django.db import migrations
from django.contrib.auth.models import Group

def create_groups(apps, schema_editor):
    """
    Función para crear los grupos iniciales (Clientes, Técnicos, Administradores).
    """
    Group.objects.get_or_create(name='Clientes')
    Group.objects.get_or_create(name='Técnicos')
    Group.objects.get_or_create(name='Administradores')

class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('auth', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_groups),
    ]
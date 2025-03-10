from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from django.contrib.auth.models import Group
from .models import CustomUser
import logging

logger = logging.getLogger(__name__)

@receiver(m2m_changed, sender=CustomUser.groups.through)
def update_admin_privileges(sender, instance, action, **kwargs):
    """
    Señal que actualiza is_staff e is_superuser cuando un usuario es agregado o eliminado del grupo Administradores.
    """
    if action in ['post_add', 'post_remove', 'post_clear']:
        # Verificar si el usuario está en el grupo Administradores
        is_admin = instance.groups.filter(name='Administradores').exists()

        # Actualizar is_staff e is_superuser
        instance.is_staff = is_admin
        instance.is_superuser = is_admin
        instance.save()

from allauth.account.signals import email_confirmed
from django.dispatch import receiver

@receiver(email_confirmed)
def email_confirmed_handler(request, email_address, **kwargs):
    logger = logging.getLogger(__name__)
    logger.info(f"Correo confirmado: {email_address.email}")
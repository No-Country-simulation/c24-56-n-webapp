# core/settings/local.py
from .base import *

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Usar SQLite para desarrollo
DATABASES['default']['NAME'] = BASE_DIR / 'db_dev.sqlite3'

# Configuración de correo para desarrollo (usar consola)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'


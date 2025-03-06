from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        """Método que se ejecuta cuando la aplicación está lista."""
        import users.signals  # Importar las señales
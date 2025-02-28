from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        """
        Método que se ejecuta cuando la aplicación está lista.
        Aquí se conecta la señal y se crean los grupos.
        """
        # Importar las señales
        import users.signals
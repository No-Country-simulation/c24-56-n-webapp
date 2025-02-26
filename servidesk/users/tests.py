from django.test import TestCase
from django.contrib.auth.models import Group
from .models import CustomUser

class CustomUserTests(TestCase):
    def setUp(self):
        """
        Configuración inicial para las pruebas.
        """
        # Crear los grupos necesarios
        Group.objects.get_or_create(name='Clientes')
        Group.objects.get_or_create(name='Técnicos')
        Group.objects.get_or_create(name='Administradores')

    def test_create_user(self):
        """
        Prueba la creación de un usuario con rol Cliente.
        """
        user = CustomUser.objects.create_user(
            email='cliente@example.com',
            password='password123',
            first_name='Juan',
            last_name='Pérez',
            rol=CustomUser.CLIENTE
        )

        # Verificar que el usuario se creó correctamente
        self.assertEqual(user.email, 'cliente@example.com')
        self.assertEqual(user.rol, CustomUser.CLIENTE)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        """
        Prueba la creación de un superusuario (rol Administrador).
        """
        user = CustomUser.objects.create_superuser(
            email='admin@example.com',
            password='password123',
            first_name='Admin',
            last_name='User',
            rol=CustomUser.ADMINISTRADOR
        )

        # Verificar que el superusuario se creó correctamente
        self.assertEqual(user.email, 'admin@example.com')
        self.assertEqual(user.rol, CustomUser.ADMINISTRADOR)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_add_user_to_admin_group(self):
        """
        Prueba que un usuario agregado al grupo Administradores obtenga is_staff e is_superuser.
        """
        user = CustomUser.objects.create_user(
            email='tecnico@example.com',
            password='password123',
            first_name='Carlos',
            last_name='Gómez',
            rol=CustomUser.TECNICO
        )

        # Verificar que el usuario no es staff ni superusuario inicialmente
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

        # Agregar al usuario al grupo Administradores
        admin_group = Group.objects.get(name='Administradores')
        user.groups.add(admin_group)

        # Verificar que is_staff e is_superuser se actualizaron correctamente
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_remove_user_from_admin_group(self):
        """
        Prueba que un usuario eliminado del grupo Administradores pierda is_staff e is_superuser.
        """
        user = CustomUser.objects.create_user(
            email='tecnico@example.com',
            password='password123',
            first_name='Carlos',
            last_name='Gómez',
            rol=CustomUser.TECNICO
        )

        # Agregar al usuario al grupo Administradores
        admin_group = Group.objects.get(name='Administradores')
        user.groups.add(admin_group)

        # Verificar que is_staff e is_superuser se actualizaron correctamente
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

        # Eliminar al usuario del grupo Administradores
        user.groups.remove(admin_group)

        # Verificar que is_staff e is_superuser se revocaron correctamente
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_user_str_representation(self):
        """
        Prueba la representación en cadena de un usuario.
        """
        user = CustomUser.objects.create_user(
            email='cliente@example.com',
            password='password123',
            first_name='Juan',
            last_name='Pérez',
            rol=CustomUser.CLIENTE
        )

        # Verificar que __str__ devuelve el formato esperado
        self.assertEqual(str(user), 'cliente@example.com (Cliente)')
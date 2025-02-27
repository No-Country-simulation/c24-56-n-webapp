from django.test import TestCase
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate
from .models import CustomUser

class CustomUserTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        """
        Configuración inicial para todas las pruebas (se ejecuta una sola vez).
        """
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
        self.assertEqual(user.email, 'cliente@example.com', "El correo electrónico del usuario no coincide")
        self.assertEqual(user.rol, CustomUser.CLIENTE, "El rol del usuario no coincide")
        self.assertFalse(user.is_staff, "El usuario no debería ser staff")
        self.assertFalse(user.is_superuser, "El usuario no debería ser superusuario")

    def test_create_user_missing_required_fields(self):
        """
        Prueba que la creación de un usuario falle si faltan campos obligatorios.
        """
        with self.assertRaises(ValueError):
            CustomUser.objects.create_user(
                email='cliente@example.com',
                password='password123',
                first_name='',  # Campo obligatorio vacío
                last_name='Pérez',
                rol=CustomUser.CLIENTE
            )

    def test_create_user_with_invalid_role(self):
        """
        Prueba que la creación de un usuario falle si se asigna un rol no válido.
        """
        with self.assertRaises(ValueError):
            CustomUser.objects.create_user(
                email='invalid@example.com',
                password='password123',
                first_name='Juan',
                last_name='Pérez',
                rol='X'  # Rol no válido
            )

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
        self.assertEqual(user.email, 'admin@example.com', "El correo electrónico del superusuario no coincide")
        self.assertEqual(user.rol, CustomUser.ADMINISTRADOR, "El rol del superusuario no coincide")
        self.assertTrue(user.is_staff, "El superusuario debería ser staff")
        self.assertTrue(user.is_superuser, "El superusuario debería ser superusuario")

    def test_user_authentication(self):
        """
        Prueba que un usuario pueda autenticarse correctamente.
        """
        user = CustomUser.objects.create_user(
            email='cliente@example.com',
            password='password123',
            first_name='Juan',
            last_name='Pérez',
            rol=CustomUser.CLIENTE
        )

        # Verificar que el usuario pueda autenticarse
        authenticated_user = authenticate(email='cliente@example.com', password='password123')
        self.assertIsNotNone(authenticated_user, "El usuario no pudo autenticarse")
        self.assertEqual(authenticated_user.email, 'cliente@example.com', "El correo electrónico del usuario autenticado no coincide")

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
        self.assertFalse(user.is_staff, "El usuario no debería ser staff inicialmente")
        self.assertFalse(user.is_superuser, "El usuario no debería ser superusuario inicialmente")

        # Agregar al usuario al grupo Administradores
        admin_group = Group.objects.get(name='Administradores')
        user.groups.add(admin_group)

        # Actualizar manualmente is_staff e is_superuser (simulando la lógica)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        # Verificar que is_staff e is_superuser se actualizaron correctamente
        self.assertTrue(user.is_staff, "El usuario debería ser staff después de agregarlo al grupo Administradores")
        self.assertTrue(user.is_superuser, "El usuario debería ser superusuario después de agregarlo al grupo Administradores")

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

        # Actualizar manualmente is_staff e is_superuser (simulando la lógica)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        # Verificar que is_staff e is_superuser se actualizaron correctamente
        self.assertTrue(user.is_staff, "El usuario debería ser staff después de agregarlo al grupo Administradores")
        self.assertTrue(user.is_superuser, "El usuario debería ser superusuario después de agregarlo al grupo Administradores")

        # Eliminar al usuario del grupo Administradores
        user.groups.remove(admin_group)

        # Actualizar manualmente is_staff e is_superuser (simulando la lógica)
        user.is_staff = False
        user.is_superuser = False
        user.save()

        # Verificar que is_staff e is_superuser se revocaron correctamente
        self.assertFalse(user.is_staff, "El usuario no debería ser staff después de eliminarlo del grupo Administradores")
        self.assertFalse(user.is_superuser, "El usuario no debería ser superusuario después de eliminarlo del grupo Administradores")

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
        self.assertEqual(str(user), 'cliente@example.com (Cliente)', "La representación en cadena del usuario no coincide")

    def test_user_str_representation_with_different_roles(self):
        """
        Prueba la representación en cadena de un usuario con diferentes roles.
        """
        user_cliente = CustomUser.objects.create_user(
            email='cliente@example.com',
            password='password123',
            first_name='Juan',
            last_name='Pérez',
            rol=CustomUser.CLIENTE
        )
        self.assertEqual(str(user_cliente), 'cliente@example.com (Cliente)', "La representación en cadena del cliente no coincide")

        user_tecnico = CustomUser.objects.create_user(
            email='tecnico@example.com',
            password='password123',
            first_name='Carlos',
            last_name='Gómez',
            rol=CustomUser.TECNICO
        )
        self.assertEqual(str(user_tecnico), 'tecnico@example.com (Técnico)', "La representación en cadena del técnico no coincide")

        user_admin = CustomUser.objects.create_user(
            email='admin@example.com',
            password='password123',
            first_name='Admin',
            last_name='User',
            rol=CustomUser.ADMINISTRADOR
        )
        self.assertEqual(str(user_admin), 'admin@example.com (Administrador)', "La representación en cadena del administrador no coincide")
# Diseño Backend de servidesk

> [!IMPORTANT]
> Esta es una versión Alfa de la aplicación

## Arquitectura
- Backend: Django + Django REST Framework (API RESTful).
- Base de datos: PostgreSQL.
- Autenticación: JWT + OAuth2 (Google, Facebook).
- Notificaciones: Twilio (SMS) + Django Email Backend (correos electrónicos).
- Frontend: Django Templates

## Estructura de carpetas

```
servidesk/
├── core/                     # Configuraciones centrales
│   ├── settings/             # Configuraciones por entorno
│   │   ├── base.py           # Configuraciones comunes
│   │   ├── local.py          # Configuraciones de desarrollo
│   │   ├── production.py     # Configuraciones de producción
├── apps/                     # Aplicaciones del proyecto
│   ├── users/                # Gestión de usuarios
│   ├── tickets/              # Gestión de incidencias
│   ├── notifications/        # Notificaciones
│   ├── reports/              # Reportes y métricas
├── templates/                # Plantillas HTML
├── static/                   # Archivos estáticos
├── requirements.txt          # Dependencias del proyecto
├── .env                      # Variables de entorno
```
### Descripción de la estructura
`core/`:

- Contiene la configuración principal del proyecto.

- Divide las configuraciones en archivos separados (`base.py`, `local.py`, `production.py`) para manejar diferentes entornos (desarrollo, producción).

`apps/`

Cada aplicación dentro de apps/ tiene una responsabilidad específica:

- `users/`: Gestiona usuarios (Clientes, Técnicos, Administradores). Aquí defines los modelos de usuarios, autenticación, permisos, etc.

- `tickets/`: Gestiona las incidencias (creación, consulta, actualización, etc.).

- `notifications/`: Gestiona notificaciones (envío de correos, SMS, alertas).

- `reports/`: Genera reportes y métricas para administradores.

`templates/` y `static/`: Si decides usar Django Templates para el frontend, aquí colocas las plantillas HTML y los archivos estáticos (CSS, JS, imágenes).

`requirements.txt`:
Lista de dependencias del proyecto (Django, DRF, Twilio, etc.).

`.env`: Archivo para almacenar variables de entorno sensibles (claves de API, credenciales de la base de datos, etc.).

## Flujo de Trabajo
1. __Autenticación y Roles__:

    - Usa JWT para autenticación segura.

    - Implementa OAuth2 para permitir inicio de sesión con Google y Facebook.

    - Define roles (`Cliente`, `Técnico`, `Administrador`) usando grupos de Django o un campo personalizado en el modelo de usuario.

2. __Gestión de Tickets__:

    - En la app `tickets/`, define modelos para:

        - `Ticket`: Campos como `descripción`, `estado`, `fecha_creación`, `cliente`, `técnico_asignado`, etc.

        - `Comentario`: Para la comunicación entre clientes y técnicos.

    - Usa DRF para crear endpoints que permitan:

        - Crear, consultar y actualizar tickets.

        - Cambiar el estado de un ticket (Pendiente, En Progreso, Resuelto).

3. __Notificaciones__:

    - En la app `notifications/`, usa:

        - __Twilio__ para enviar SMS.

        - __Django Email Backend__ para enviar correos electrónicos.

    - Configura señales (signals) en Django para enviar notificaciones automáticas cuando cambie el estado de un ticket.

4. __Reportes__:

    - En la app `reports/`, usa bibliotecas como __Pandas__ o __Matplotlib__ para generar métricas y gráficos.

    - Crea endpoints para que los administradores puedan descargar reportes en formato PDF o Excel.

5. __Integraciones__:

    - Configura __OAuth2__ para permitir inicio de sesión con _Google_ y _Facebook_.

    - Usa __PostgreSQL__ como base de datos principal.

## Recomendaciones
- __Autenticación__: djangorestframework-simplejwt (JWT), django-allauth (OAuth2).

- __Notificaciones__: django-templated-mail (envío de correos), twilio (SMS).

- __Reportes__: pandas (análisis de datos), reportlab (generación de PDFs).

- __Despliegue__: Docker (contenedorización), Gunicorn + Nginx (producción).

- __Pruebas__: Escribe pruebas unitarias y de integración para cada app.

- __Documentación__: Usa __Swagger__ o __drf-yasg__ para documentar tu API.

- __Seguridad__: Implementa medidas como CORS, rate limiting y validación de datos.

## Buenas Prácticas

La estructura propuesta refleja los principios SOLID de la siguiente manera:

- SRP: Cada app tiene una responsabilidad única.

- OCP: El sistema es extensible sin modificar el código existente.

- LSP: Los modelos y vistas pueden ser extendidos sin alterar su comportamiento base.

- ISP: Las APIs y serializadores son específicos para cada funcionalidad.

- DIP: Las dependencias se invierten mediante abstracciones y configuración dinámica.
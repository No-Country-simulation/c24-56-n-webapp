## Proyecto: Sistema de Incidencias TI

Este proyecto es una aplicación web para la gestión de incidencias de TI, permitiendo a los usuarios reportar y hacer seguimiento a problemas técnicos.

# Help-Desk-Saas c24-56-n-WebApp
Las soluciones SaaS permiten a los usuarios acceder a aplicaciones basadas en la nube sin necesidad de descargarlas.  Ventajas de las soluciones SaaS  Ahorro de costos Mayor accesibilidad Actualizaciones sin esfuerzo Integración perfecta Flexibilidad y productividad Almacenamiento seguro de datos en la nube.

## 📁 Estructura del Proyecto Frontend

```
📦 Proyecto
├── 📂 assets/                      # Contiene imágenes, fuentes e íconos.
├── 📂 dashboard administrador/     # Dashboard adminstrador
│   ├── dashboard.css
│   ├── dashboard.js
│   ├── dashboard.rtl.css 
│   ├── index_adminstrador.html
├── 📂 dashboard cliente/           # Dashboard cliente
│   ├── dashboard.css
│   ├── dashboard.js
│   ├── dashboard.rtl.css 
│   ├── index_cliente.html
├── 📂 dashboard tecnico/            # Dashboard tecnico
│   ├── dashboard.css
│   ├── dashboard.js
│   ├── dashboard.rtl.css 
│   ├── index_tecnico.html
├── 📂 img/                          # imagenes
├── 📂 recovey/                      # Recuperar contraseña.
│   ├── index.html
│   ├── sign-in.css                    #Archivo estilos css.
├── 📂 register-in/                   # Registro de roles.
│   ├── index.html
│   ├── sign-in.css                    #Archivo estilos css.
├── 📂 sign-in/                        # Inicio de Sesion.
│   ├── index.html
│   ├── sign-in.css                    #Archivo estilos css.
└── README.md                          # Documentación del proyecto.
```

## 🌿 Ramas del Repositorio

Para mantener un flujo de trabajo ordenado, el proyecto usa las siguientes ramas en GitHub:

### 🔹 `main`
- Es la rama principal y estable.
- Contiene la versión en producción del proyecto.

### 🔹 `develop` Silvia
- Rama de desarrollo principal.
- Aquí se integran nuevas funcionalidades antes de pasarlas a `main`.

### 🔹 `feature/frontend-fixes` Yaneth
- Se usa para corregir errores en la interfaz de usuario.
- Se fusiona en `develop` una vez validados los cambios.

### 🔹 `feature/ui-improvements` Javiera
- Rama destinada a mejoras en el diseño y experiencia de usuario.
- Incluye optimización de estilos, animaciones, etc.

### 🔹 `hotfix/frontend-bug`
- Para solucionar errores críticos detectados en producción.
- Se fusiona directamente en `main` y luego en `develop`.

## 🚀 Flujo de Trabajo con Git
1. **Crear una nueva rama desde `develop`**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nueva-funcionalidad
   ```
2. **Realizar cambios y subirlos al repositorio**
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push origin feature/nueva-funcionalidad
   ```
3. **Crear un Pull Request para fusionar en `develop`**
4. **Revisar y aprobar cambios antes de fusionar con `main`**

---

Este documento ayudará a organizar el desarrollo del proyecto, asegurando una colaboración eficiente y un código limpio. 🚀

Pantalla de inicio de sesion
![Inicio_de_sesion](/frontend/img/Inicio%20de%20Sesion.png)

Pantalla de recuperacion contraseña
![Recuperacion_contraseña](/frontend/img/Recuperar.png)

Pantalla registro de usuario
![Registro_de_usuario](/frontend/img/Registrarse.png)

Dashboard Cliente
![Dashboard_cliente](/frontend/img/image-3.png)

Pantalla ticket
![Pantalla_ticket](/frontend/img/image-4.png)
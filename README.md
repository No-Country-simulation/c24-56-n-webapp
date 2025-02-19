## Proyecto: Sistema de Incidencias TI

Este proyecto es una aplicación web para la gestión de incidencias de TI, permitiendo a los usuarios reportar y hacer seguimiento a problemas técnicos.

# Help-Desk-Saas c24-56-n-WebApp
Las soluciones SaaS permiten a los usuarios acceder a aplicaciones basadas en la nube sin necesidad de descargarlas.  Ventajas de las soluciones SaaS  Ahorro de costos Mayor accesibilidad Actualizaciones sin esfuerzo Integración perfecta Flexibilidad y productividad Almacenamiento seguro de datos en la nube.

## 📁 Estructura del Proyecto Frontend

```
📦 Proyecto
├── 📂 assets/          # Contiene imágenes, fuentes e íconos.
├── 📂 components/      # Componentes reutilizables (botones, formularios, etc.).
├── 📂 css/             # css.
│   ├── bootstrap.min.css   # Archivo de bootstrap (tema).
│   ├── style.css       #Archivo estilos css.
├── 📂 public/          # Archivos públicos accesibles, como index.html.
│   ├── index.html      # Archivo HTML principal de la aplicación.
├── 📂 styles/          # Contiene los archivos de estilos (CSS/Sass).
│   ├── style.scss      # Archivo principal de estilos con Sass.
│   ├── _variables.scss  #Archivo variables
├── 📂 views/           # Plantillas de la interfaz de usuario.
├── 📂 scripts/         # Contiene los archivos de lógica del frontend.
│   ├── script_index.js # Archivo JavaScript principal.
│   ├── script_login.js # Script de manejo de autenticación/login.
└── README.md           # Documentación del proyecto.
```

## 🌿 Ramas del Repositorio

Para mantener un flujo de trabajo ordenado, el proyecto usa las siguientes ramas en GitHub:

### 🔹 `main`
- Es la rama principal y estable.
- Contiene la versión en producción del proyecto.

### 🔹 `develop`
- Rama de desarrollo principal.
- Aquí se integran nuevas funcionalidades antes de pasarlas a `main`.

### 🔹 `feature/frontend-fixes`
- Se usa para corregir errores en la interfaz de usuario.
- Se fusiona en `develop` una vez validados los cambios.

### 🔹 `feature/ui-improvements`
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


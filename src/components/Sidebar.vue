<template>
  <nav class="sidebar" :class="{ 'collapsed': collapsed, 'mobile-open': isMobileOpen }">
    <!-- Encabezado del Sidebar -->
    <div class="sidebar-header">
      <div class="brand-container">
        <router-link to="/" class="brand-logo">
          <i class="mdi mdi-help-circle-outline"></i>
          <span class="brand-text">ServiDesk</span>
        </router-link>
      </div>
      <button class="close-sidebar" @click="closeSidebar">
        <i class="mdi mdi-close"></i>
      </button>
    </div>

    <!-- Menú de Navegación -->
    <ul class="nav">
      <!-- Perfil sin imagen -->
      <li class="nav-item profile">
        <div class="profile-info">
          <div class="profile-icon">
            <i class="mdi mdi-account-circle"></i>
          </div>
          <div class="profile-details">
            <h5 class="username">Admin User</h5>
            <span class="role">Administrador</span>
          </div>
        </div>
      </li>

      <!-- Elementos del Menú -->
      <li class="nav-item">
        <router-link 
          to="/dashboard" 
          class="nav-link"
          exact-active-class="active"
        >
          <i class="mdi mdi-view-dashboard"></i>
          <span class="menu-title">Dashboard</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link
          to="/tasks"
          class="nav-link"
          exact-active-class="active"
        >
          <i class="mdi mdi-clipboard-alert"></i>
          <span class="menu-title">Incidencias</span>
          <span class="badge bg-warning">3</span>
        </router-link>
      </li>

      <!-- Menú adicional -->
      <li class="nav-item">
        <a class="nav-link">
          <i class="mdi mdi-cog"></i>
          <span class="menu-title">Configuración</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    collapsed: Boolean,
    isMobileOpen: Boolean
  },
  methods: {
    closeSidebar() {
      this.$emit('close-sidebar')
    }
  }
}
</script>

<style scoped>
.sidebar {
  --sidebar-width: 260px;
  --collapsed-width: 80px;
  
  width: var(--sidebar-width);
  height: 100vh;
  background: #2D3748;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  box-shadow: 4px 0 15px rgba(0,0,0,0.1);
}

.sidebar.collapsed {
  width: var(--collapsed-width);
}

/* Encabezado */
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: white;
}

.brand-logo i {
  font-size: 2rem;
  color: #5B8FB9;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 600;
  opacity: 1;
  transition: opacity 0.3s;
}

/* Botón de cierre */
.close-sidebar {
  background: none;
  border: none;
  color: rgba(255,255,255,0.7);
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-sidebar:hover {
  color: white;
  transform: rotate(90deg);
}

.close-sidebar i {
  font-size: 1.5rem;
}

/* Perfil */
.profile-info {
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-icon i {
  font-size: 2.5rem;
  color: #CBD5E0;
}

.profile-details {
  line-height: 1.4;
}

.username {
  color: white;
  margin: 0;
  font-size: 1rem;
}

.role {
  color: #CBD5E0;
  font-size: 0.875rem;
}

/* Elementos del Menú */
.nav-item {
  margin: 0.25rem 0;
}

.nav-link {
  display: flex;
  align-items: center;
  color: rgba(255,255,255,0.7);
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(255,255,255,0.05);
  color: white;
}

.nav-link.active {
  background: #2A5C82;
  color: white !important;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: white;
}

.nav-link i {
  font-size: 1.5rem;
  min-width: 40px;
  transition: margin 0.3s;
}

.menu-title {
  transition: opacity 0.3s;
}

.badge {
  margin-left: auto;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
}

/* Estado colapsado */
.sidebar.collapsed:not(.mobile-open) {
  .brand-text,
  .menu-title,
  .profile-details,
  .badge {
    opacity: 0;
    visibility: hidden;
  }
  
  .nav-link {
    justify-content: center;
    padding: 0.75rem;
  }
  
  .profile-info {
    justify-content: center;
  }
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: var(--sidebar-width);
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  
  .close-sidebar {
    display: block;
  }
}
</style>
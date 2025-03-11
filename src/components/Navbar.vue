<template>
  <nav class="navbar" :class="{ 'collapsed': collapsed }">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" @click="toggleSidebar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-content">
        <h4 class="page-title">{{ currentPageTitle }}</h4>
        <div class="user-menu">
          <div class="user-info" @click="toggleUserMenu">
            <span class="user-name">Admin User</span>
            <i class="mdi mdi-chevron-down"></i>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    collapsed: Boolean // Recibe el estado del sidebar desde App.vue
  },
  data() {
    return {
      currentPageTitle: "Dashboard"
    }
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar'); // Emite el evento para App.vue
    },
    toggleUserMenu() {
      // Lógica para menú de usuario (implementar según necesidad)
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 260px; /* Ancho inicial del sidebar */
  right: 0;
  height: 64px;
  background: white;
  box-shadow: 0 2px 15px rgba(0,0,0,0.05);
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.navbar.collapsed {
  left: 80px; /* Ancho cuando el sidebar está colapsado */
}

.navbar-toggler {
  border: none;
  padding: 0.5rem;
  margin-right: 1rem;
}

.navbar-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  margin: 0;
  font-size: 1.25rem;
  color: #2D3748;
  font-weight: 600;
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.user-info:hover {
  background: #F7FAFC;
}

.user-name {
  margin-right: 10px;
  font-weight: 500;
  color: #4A5568;
}

.mdi-chevron-down {
  font-size: 1.2rem;
  color: #718096;
  transition: transform 0.3s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    left: 0 !important;
  }
  
  .navbar.collapsed {
    left: 0 !important;
  }
  
  .page-title {
    font-size: 1.1rem;
  }
  
  .user-name {
    display: none;
  }
}
</style>
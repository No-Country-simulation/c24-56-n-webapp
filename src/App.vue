<template>
  <div class="container-scroller">
    <!-- Sidebar -->
    <Sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar"/>
    
    <div class="container-fluid page-body-wrapper">
      <!-- Navbar -->
      <Navbar @toggle-sidebar="toggleSidebar"/>
      
      <!-- Main Content -->
      <div class="main-panel">
        <div class="content-wrapper">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component"/>
            </transition>
          </router-view>
        </div>
        
        <Footer/>
      </div>
    </div>
    
    <!-- Global Components -->
    <ToastSuccess :visible="showToast"/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ToastSuccess from '@/components/ToastSuccess.vue'

export default {
  components: { Sidebar, Navbar, Footer, ToastSuccess },
  data() {
    return {
      sidebarCollapsed: false,
      showToast: false
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
  }
}
</script>

<style>
/* Transiciones globales */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ajustes de layout */
.container-scroller {
  min-height: 100vh;
}

.page-body-wrapper {
  padding-top: 70px; /* Altura del navbar */
  margin-left: 260px; /* Ancho del sidebar */
  transition: margin-left 0.3s;
}

.sidebar-collapsed .page-body-wrapper {
  margin-left: 80px;
}
</style>
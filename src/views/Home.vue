<template>
  <div class="home">
    <div class="container py-4">
      <div class="welcome-section">
        <h2 class="welcome-title">Bienvenido al Sistema de Soporte <strong>ServiDesk</strong></h2>
        <button class="btn btn-primary-custom" @click="openModal">
          <i class="bi bi-plus-circle"></i> Crear Nueva Incidencia
        </button>
      </div>
    </div>

    <!-- Lista ÚNICA de Incidencias -->
    <IncidentList 
      :incidents="incidents" 
      @incident-clicked="openDetailModal"
    />

    <!-- Modal de Detalles -->
    <IncidentDetailModal
      v-if="showDetailModal"
      :incident="selectedIncident"
      @close="showDetailModal = false"
    />

    <!-- Modal de Creación -->
    <ModalIncident 
      v-if="showModal" 
      @close="showModal = false" 
      @saved="onIncidentSaved" 
    />

    <!-- Toast de Éxito -->
    <ToastSuccess 
      v-if="showToast" 
      @close="showToast = false" 
    />
  </div>
</template>

<script>
import IncidentList from '@/components/IncidentList.vue';
import ModalIncident from '@/components/ModalIncident.vue';
import ToastSuccess from '@/components/ToastSuccess.vue';
import IncidentDetailModal from '@/components/IncidentDetailModal.vue';

export default {
  name: 'Home',
  components: { 
    IncidentList,
    ModalIncident,
    ToastSuccess,
    IncidentDetailModal 
  },
  data() {
    return {
      showModal: false,
      showToast: false,
      showDetailModal: false,
      selectedIncident: null,
      incidents: [
        { id: 1, title: 'Error en servidor', status: 'Pendiente', date: '12-02-2025', description: 'El servidor no responde.' },
        { id: 2, title: 'Problema de red', status: 'En proceso', date: '12-02-2025', description: 'La red está lenta.' },
        { id: 3, title: 'Caída de Windows', status: 'Resuelto', date: '13-02-2025', description: 'El sistema operativo falló.' },
        { id: 4, title: 'Problema con el mouse', status: 'Pendiente', date: '13-02-2025', description: 'El mouse no funciona.' },
      ],
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    onIncidentSaved(newIncident) {
      this.incidents.push({ 
        ...newIncident, 
        id: this.incidents.length + 1 
      });
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 3000);
    },
    openDetailModal(incident) {
      this.selectedIncident = incident;
      this.showDetailModal = true;
    }
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
}
.welcome-section {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.btn-primary-custom {
  background: #2A5C82;
  color: white;
  padding: 12px 25px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-primary-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(42,92,130,0.3);
}
.bi-plus-circle {
  font-size: 1.2rem;
}
</style>
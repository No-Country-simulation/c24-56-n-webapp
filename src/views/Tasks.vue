<template>
  <div class="tasks">
    <div class="container py-4">
      <div class="welcome-section">
        <h2 class="welcome-title">Gestión de Incidencias <strong>Técnicas</strong></h2>
        <button class="btn btn-primary-custom" @click="openModal">
          <i class="bi bi-plus-circle"></i> Nueva Incidencia Técnica
        </button>
      </div>
    </div>

    <!-- Lista Única con interacción -->
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

    <ModalIncident 
      v-if="showModal" 
      @close="showModal = false" 
      @saved="onIncidentSaved" 
    />

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
  name: 'Tasks',
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
      nextId: 5,  // Contador para nuevos IDs
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
        id: this.nextId++,
        status: 'Pendiente',
        date: new Date().toLocaleDateString('es-ES')
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
.tasks {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.welcome-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.welcome-title {
  color: #2A5C82;
  font-size: 1.8rem;
}

.btn-primary-custom {
  background: #5B8FB9;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary-custom:hover {
  background: #2A5C82;
  transform: translateY(-2px);
}
</style>
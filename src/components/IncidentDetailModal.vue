<template>
    <div v-if="selectedIncident" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ selectedIncident.title }}</h2>
        <div class="status-container">
          <span :class="`status-badge ${statusClass}`">
            {{ selectedIncident.status }}
          </span>
          <span class="date">{{ selectedIncident.date }}</span>
        </div>
        <p class="description">{{ selectedIncident.description }}</p>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['selectedIncident'],
    computed: {
      statusClass() {
        return this.selectedIncident.status.toLowerCase().replace(' ', '-');
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  }
  </script>
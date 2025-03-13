<template>
  <div class="dashboard">
    <div class="container-fluid">
      <div class="row g-4">
        <!-- Tarjeta de Resumen -->
        <div class="col-md-4">
          <Card class="h-100">
            <h4 class="card-title mb-4">📊 Resumen General</h4>
            <div class="metric-item">
              <span class="metric-value text-primary">{{ totalIncidents }}</span>
              <span class="metric-label">Incidencias Totales</span>
            </div>
            <div class="metric-item">
              <span class="metric-value text-success">{{ resolvedIncidents }}</span>
              <span class="metric-label">Resueltas</span>
            </div>
            <div class="metric-item">
              <span class="metric-value text-warning">{{ pendingIncidents }}</span>
              <span class="metric-label">Pendientes</span>
            </div>
          </Card>
        </div>

        <!-- Gráfico de Estado -->
        <div class="col-md-8">
          <Card class="h-100">
            <h4 class="card-title mb-4">📈 Distribución de Incidencias</h4>
            <div class="chart-container">
              <!-- Espacio para gráfico (usar Chart.js o similar) -->
              <div class="chart-placeholder"></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  components: { Card },
  computed: {
    totalIncidents() {
      return this.$store.state.incidents.length; // Asumiendo uso de Vuex
    },
    resolvedIncidents() {
      return this.$store.state.incidents.filter(i => i.status === 'Resuelto').length;
    },
    pendingIncidents() {
      return this.$store.state.incidents.filter(i => i.status === 'Pendiente').length;
    }
  }
};
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.metric-item {
  margin-bottom: 1.5rem;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 600;
  display: block;
}

.metric-label {
  color: #6c757d;
  font-size: 1.1rem;
}

.chart-container {
  height: 300px;
}

.chart-placeholder {
  background: #e9ecef;
  border-radius: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.text-primary { color: #2A5C82 !important; }
.text-success { color: #28a745 !important; }
.text-warning { color: #ffc107 !important; }
</style>
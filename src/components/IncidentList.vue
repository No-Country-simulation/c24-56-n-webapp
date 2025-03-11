<template>
  <div class="incidents-container">
    <div 
      v-for="incident in incidents" 
      :key="incident.id" 
      class="incident-card"
      @click="$emit('incident-clicked', incident)"
    >
      <h3 class="incident-title">{{ incident.title }}</h3>
      <p class="incident-description">{{ incident.description }}</p>
      <span class="status-badge" :class="incident.status.toLowerCase().replace(' ', '-')">
        {{ incident.status }}
      </span>
      <span class="incident-date">{{ incident.date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "IncidentList",
  props: {
    incidents: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.incidents-container {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 1rem;
}

.incident-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.incident-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.incident-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: #2A5C82;
}

.incident-title {
  color: #2D3748;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.incident-description {
  color: #718096;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.incident-date {
  display: block;
  color: #A0AEC0;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge.pendiente {
  background-color: #FED7D7;
  color: #C53030;
}

.status-badge.en-proceso {
  background-color: #FEFCBF;
  color: #B7791F;
}

.status-badge.resuelto {
  background-color: #C6F6D5;
  color: #2F855A;
}
</style>
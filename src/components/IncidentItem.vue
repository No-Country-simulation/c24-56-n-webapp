<template>
    <div class="col-md-6">
      <div class="card incident-card">
        <div class="card-body">
          <h5 class="card-title">{{ incident.title }}</h5>
          <p class="card-text">
            <span class="badge-status">{{ incident.status }}</span>
            <small class="text-muted ms-2">{{ incident.date }}</small>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'IncidentItem',
    props: {
      incident: Object
    }
  }
  </script>
  
  <style scoped>
  /* Puedes incluir aquí ajustes específicos si es necesario */
  </style>
  
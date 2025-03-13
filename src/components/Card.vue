<template>
    <div class="card">
      <div class="card-body">
        <slot></slot> <!-- Contenido dinámico -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Card",
  };
  </script>
  
  <style scoped>
  /* Estilos específicos de la tarjeta */
  </style>
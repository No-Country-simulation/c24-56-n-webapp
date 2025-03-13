// 1. Función para cargar el desempeño del técnico
function cargarDesempeno() {
  // Simulación de carga de desempeño del técnico
  const incidenciasResueltas = 10; // Número de incidencias resueltas
  const tiempoPromedioResolucion = 5; // Tiempo promedio de resolución en horas

  // Actualizar el contenido del HTML con los datos simulados
  document.getElementById("incidenciasResueltas").textContent = incidenciasResueltas;
  document.getElementById("tiempoPromedioResolucion").textContent = `${tiempoPromedioResolucion} horas`;
}

// 2. Evento que se ejecuta cuando el DOM se ha cargado completamente
document.addEventListener("DOMContentLoaded", function () {
  // Llamar a la función para cargar el desempeño del técnico
  cargarDesempeno();
});









//////a partir de aca lo estoy revisando al index_tecnico.htm
// // 8. Sección para ver desempeño y tiempo promedio de resolución
//este Script consume datos de la tabla
//Script para actualizar datos dinámicamente 
  async function actualizarDesempeño() {
    try {
      // Simulación de datos obtenidos desde una API (Base de Datos)
      const response = await fetch("https://tu-api.com/incidencias");
      const datos = await response.json();

      // Extraer datos
      const pendientes = datos.filter(i => i.estado === "pendiente").length;
      const enProgreso = datos.filter(i => i.estado === "en progreso").length;
      const resueltas = datos.filter(i => i.estado === "resuelta").length;

      // Calcular tiempo promedio de resolución
      const tiempos = datos
        .filter(i => i.estado === "resuelta")
        .map(i => i.tiempoResolucion); // Array con los tiempos de resolución

      const tiempoPromedio = tiempos.length > 0 
        ? (tiempos.reduce((a, b) => a + b, 0) / tiempos.length).toFixed(2) 
        : 0;

      // Actualizar HTML
      document.getElementById("incidenciasPendientes").textContent = pendientes;
      document.getElementById("incidenciasenProgreso").textContent = enProgreso;
      document.getElementById("incidenciasResueltas").textContent = resueltas;
      document.getElementById("tiempoPromedioResolucion").textContent = `${tiempoPromedio} horas`;

    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

  // Actualizar cada 10 segundos
  setInterval(actualizarDesempeño, 10000);
  actualizarDesempeño(); // Llamada inicial


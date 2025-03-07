// 1. Manejar el formulario de cambio de estado
document.getElementById("estadoForm").addEventListener("submit", function (event) {
  event.preventDefault();
  // Lógica para cambiar el estado de la incidencia
  const nuevoEstado = document.getElementById("estado").value;
  // Aquí deberías agregar la lógica para actualizar el estado en el servidor
  alert("Estado cambiado a: " + nuevoEstado);
  $("#estadoModal").modal("hide");
});

// 2. Manejar el formulario de respuesta a clientes
document.getElementById("respuestaForm").addEventListener("submit", function (event) {
  event.preventDefault();
  // Lógica para enviar la respuesta al cliente
  const respuesta = document.getElementById("respuesta").value;
  // Aquí deberías agregar la lógica para enviar la respuesta al servidor
  alert("Respuesta enviada: " + respuesta);
  $("#respuestaModal").modal("hide");
});

// 3. Función para abrir el modal de cambio de estado
window.abrirModalEstado = function (id) {
  $("#estadoModal").modal("show");
};

// 4. Función para abrir el modal de respuesta a clientes
window.abrirModalRespuesta = function (id) {
  $("#respuestaModal").modal("show");
};

// 5. Función para ver detalles de la incidencia
function verIncidencia(id) {
  const incidencia = obtenerIncidenciaPorId(id);
  const modalBody = document.getElementById("detalleModalBody");
  modalBody.innerHTML = `
    <p><strong>ID:</strong> ${incidencia.id}</p>
    <p><strong>Título:</strong> ${incidencia.titulo}</p>
    <p><strong>Estado:</strong> ${incidencia.estado}</p>
    <p><strong>Fecha:</strong> ${incidencia.fecha}</p>
    <p><strong>Descripción:</strong> ${incidencia.descripcion}</p>
  `;
  new bootstrap.Modal(document.getElementById("detalleModal")).show();
}

// 6. Función para confirmar eliminación de incidencia
function confirmarEliminarIncidencia(id) {
  const incidencia = obtenerIncidenciaPorId(id);
  const modalBody = document.getElementById("detalleModalBody");
  modalBody.innerHTML = `
    <p><strong>ID:</strong> ${incidencia.id}</p>
    <p><strong>Título:</strong> ${incidencia.titulo}</p>
    <p><strong>Estado:</strong> ${incidencia.estado}</p>
    <p><strong>Fecha:</strong> ${incidencia.fecha}</p>
    <p><strong>Descripción:</strong> ${incidencia.descripcion}</p>
    <button class="btn btn-danger mt-3" onclick="eliminarIncidencia(${id})">Eliminar</button>
  `;
  new bootstrap.Modal(document.getElementById("detalleModal")).show();
}

// 7. Función para obtener incidencia por ID (simulación)
function obtenerIncidenciaPorId(id) {
  return incidencias.find((incidencia) => incidencia.id === id);
}

// 8. Función para eliminar incidencia (simulación)
function eliminarIncidencia(id) {
  alert(`Incidencia con ID ${id} eliminada.`);
  // Aquí puedes agregar la lógica para eliminar la incidencia de la base de datos
  new bootstrap.Modal(document.getElementById("detalleModal")).hide();
  cargarIncidencias();
}

// 9. Datos de ejemplo de incidencias
const incidencias = [
  { id: 1, titulo: "Incidencia 1", estado: "Abierta", fecha: "2025-03-01", descripcion: "Problema con el servidor" },
  { id: 2, titulo: "Incidencia 2", estado: "Cerrada", fecha: "2025-03-02", descripcion: "Problema con la red" },
  { id: 3, titulo: "Incidencia 3", estado: "En Proceso", fecha: "2025-03-03", descripcion: "Problema con la base de datos" },
  { id: 4, titulo: "Incidencia 4", estado: "Abierta", fecha: "2025-03-04", descripcion: "Problema con el software" },   
  { id: 5, titulo: "Incidencia 5", estado: "Cerrada", fecha: "2025-03-05", descripcion: "Problema con el hardware" },
  { id: 6, titulo: "Incidencia 6", estado: "Abierta", fecha: "2025-03-06", descripcion: "Problema con el sistema operativo" },
  { id: 7, titulo: "Incidencia 7", estado: "Cerrada", fecha: "2025-03-07", descripcion: "Problema con la conexión a internet" },
  { id: 8, titulo: "Incidencia 8", estado: "En Proceso", fecha: "2025-03-08", descripcion: "Problema con la impresora" },
  { id: 9, titulo: "Incidencia 9", estado: "Abierta", fecha: "2025-03-09" , descripcion: "Problema con el servidor" },
  { id: 10, titulo: "Incidencia 10", estado: "Cerrada", fecha: "2025-03-10", descripcion: "Problema con la red" },
];




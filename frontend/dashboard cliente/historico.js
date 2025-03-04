document.addEventListener('DOMContentLoaded', function() {
  // Cargar historial de incidencias
  cargarHistorial();

  // Manejar el formulario de chat
  document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Lógica para enviar el mensaje del chat
    const mensaje = document.getElementById('chatInput').value;
    // Aquí deberías agregar la lógica para enviar el mensaje al servidor
    const chatMessages = document.getElementById('chatMessages');
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat-message');
    newMessage.textContent = 'Tú: ' + mensaje;
    chatMessages.appendChild(newMessage);
    document.getElementById('chatForm').reset();
  });
});

function cargarHistorial() {
  // Simulación de carga de historial de incidencias
  const incidencias = [
    { titulo: 'Problema con la conexión', descripcion: 'No puedo conectarme a internet', fecha: '2025-03-01', categoria: 'software', archivo: 'conexión.png' },
    { titulo: 'Error en el sistema', descripcion: 'El sistema se cuelga al iniciar', fecha: '2025-03-02', categoria: 'hardware', archivo: 'error.log' },
    { titulo: 'Solicitud de soporte', descripcion: 'Necesito ayuda con la impresora', fecha: '2025-03-03', categoria: 'periferico', archivo: 'impresora.pdf' }
  ];

  const tbody = document.getElementById('tablaDatos');
  incidencias.forEach(incidencia => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${incidencia.titulo}</td>
      <td>${incidencia.descripcion}</td>
      <td>${incidencia.fecha}</td>
      <td>${incidencia.categoria}</td>
      <td>${incidencia.archivo}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="verDetalle('${incidencia.titulo}', '${incidencia.descripcion}', '${incidencia.fecha}', '${incidencia.categoria}', '${incidencia.archivo}')">Ver Detalle</button>
        <button class="btn btn-sm btn-secondary" onclick="abrirChat()">Chatear</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function verDetalle(titulo, descripcion, fecha, categoria, archivo) {
  // Lógica para ver el detalle de la incidencia
  const detalleModalBody = document.getElementById('detalleModalBody');
  detalleModalBody.innerHTML = `
    <p><strong>Título:</strong> ${titulo}</p>
    <p><strong>Descripción:</strong> ${descripcion}</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
    <p><strong>Categoría:</strong> ${categoria}</p>
    <p><strong>Archivo:</strong> ${archivo}</p>
  `;
  $('#detalleModal').modal('show');
}

function abrirChat() {
  // Lógica para abrir el chat con el técnico
  $('#chatModal').modal('show');
}
/* globals Chart:false */

(() => {
  'use strict'

  // Graphs
  const ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      datasets: [{
        data: [
          15339,
          21345,
          18483,
          24003,
          23489,
          24092,
          12034
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          boxPadding: 3
        }
      }
    }
  })
})()

document.addEventListener('DOMContentLoaded', function() {
  // Cargar historial de incidencias
  cargarHistorial();

  // Manejar el formulario de reporte de incidencia
  document.getElementById('incidentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Lógica para enviar el formulario de incidencia
    const titulo = document.getElementById('title').value;
    const fecha = document.getElementById('fecha').value;
    const categoria = document.getElementById('categoria').value;
    const descripcion = document.getElementById('description').value;
    const archivo = document.getElementById('file').files[0];
    // Aquí deberías agregar la lógica para enviar los datos al servidor
    alert('Incidencia reportada: ' + titulo);
    document.getElementById('incidentForm').reset();
    document.getElementById('successMsg').style.display = 'block';
  });

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





//inicia el ** historico.js **   se carga en dashboard.js
document.addEventListener('DOMContentLoaded', function () {
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











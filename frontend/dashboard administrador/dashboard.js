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

  document.addEventListener('DOMContentLoaded', function() {
    // Cargar incidencias
    cargarIncidencias();

    // Manejar el formulario de cambio de estado
    document.getElementById('estadoForm').addEventListener('submit', function(event) {
      event.preventDefault();
      // Lógica para cambiar el estado de la incidencia
      const nuevoEstado = document.getElementById('estado').value;
      // Aquí deberías agregar la lógica para actualizar el estado en el servidor
      alert('Estado cambiado a: ' + nuevoEstado);
      $('#estadoModal').modal('hide');
    });

    // Manejar el formulario de asignar técnico
    document.getElementById('asignarTecnicoForm').addEventListener('submit', function(event) {
      event.preventDefault();
      // Lógica para asignar técnico
      const tecnico = document.getElementById('tecnico').value;
      // Aquí deberías agregar la lógica para asignar el técnico en el servidor
      alert('Técnico asignado: ' + tecnico);
      $('#asignarTecnicoModal').modal('hide');
    });

    // Manejar el formulario de configurar alertas
    document.getElementById('configurarAlertasForm').addEventListener('submit', function(event) {
      event.preventDefault();
      // Lógica para configurar alertas
      const alerta = document.getElementById('alerta').value;
      // Aquí deberías agregar la lógica para configurar las alertas en el servidor
      alert('Alerta configurada: ' + alerta);
      $('#configurarAlertasModal').modal('hide');
    });

    // Manejar el formulario de respuesta a clientes
    document.getElementById('respuestaForm').addEventListener('submit', function(event) {
      event.preventDefault();
      // Lógica para enviar la respuesta al cliente
      const respuesta = document.getElementById('respuesta').value;
      // Aquí deberías agregar la lógica para enviar la respuesta al servidor
      alert('Respuesta enviada: ' + respuesta);
      $('#respuestaModal').modal('hide');
    });
  });

  function cargarIncidencias() {
    // Simulación de carga de incidencias
    const incidencias = [
      { id: 1, titulo: 'Problema con la conexión', estado: 'recibida', fecha: '2025-03-01' },
      { id: 2, titulo: 'Error en el sistema', estado: 'en_proceso', fecha: '2025-03-02' },
      { id: 3, titulo: 'Solicitud de soporte', estado: 'cerrada', fecha: '2025-03-03' }
    ];

    const tbody = document.getElementById('incidenciasTable');
    incidencias.forEach(incidencia => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${incidencia.id}</td>
        <td>${incidencia.titulo}</td>
        <td>${incidencia.estado}</td>
        <td>${incidencia.fecha}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="abrirModalEstado(${incidencia.id})">Cambiar Estado</button>
          <button class="btn btn-sm btn-secondary" onclick="abrirModalAsignarTecnico(${incidencia.id})">Asignar Técnico</button>
          <button class="btn btn-sm btn-secondary" onclick="abrirModalRespuesta(${incidencia.id})">Responder</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.abrirModalEstado = function(id) {
    // Lógica para abrir el modal de cambio de estado
    $('#estadoModal').modal('show');
  }

  window.abrirModalAsignarTecnico = function(id) {
    // Lógica para abrir el modal de asignar técnico
    $('#asignarTecnicoModal').modal('show');
  }

  window.abrirModalConfigurarAlertas = function() {
    // Lógica para abrir el modal de configurar alertas
    $('#configurarAlertasModal').modal('show');
  }

  window.abrirModalRespuesta = function(id) {
    // Lógica para abrir el modal de respuesta a clientes
    $('#respuestaModal').modal('show');
  }
})()

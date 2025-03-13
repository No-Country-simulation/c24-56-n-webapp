/* globals Chart:false */

(() => {
  "use strict";

  // Graphs
  const ctx = document.getElementById("myChart");
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
          lineTension: 0,
          backgroundColor: "transparent",
          borderColor: "#007bff",
          borderWidth: 4,
          pointBackgroundColor: "#007bff",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          boxPadding: 3,
        },
      },
    },
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  // Cargar historial de incidencias
  cargarHistorial();

  // Manejar el formulario de reporte de incidencia
  document
    .getElementById("incidentForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // Lógica para enviar el formulario de incidencia
      const titulo = document.getElementById("title").value;
      const fecha = document.getElementById("fecha").value;
      const categoria = document.getElementById("categoria").value;
      const descripcion = document.getElementById("description").value;
      const archivo = document.getElementById("file").files[0]
        ? document.getElementById("file").files[0].name
        : "";

      const incidencia = {
        titulo,
        fecha,
        categoria,
        descripcion,
        archivo,
        fecha_creacion: new Date().toISOString(),
      };

      let incidencias = JSON.parse(localStorage.getItem("incidencias")) || [];
      incidencias.push(incidencia);
      localStorage.setItem("incidencias", JSON.stringify(incidencias));

      alert("Incidencia reportada: " + titulo);
      document.getElementById("incidentForm").reset();
      document.getElementById("successMsg").style.display = "block";
      setTimeout(() => {
        document.getElementById("successMsg").style.display = "none";
      }, 3000);

      cargarHistorial();
    });

  // Manejar el formulario de chat
  document
    .getElementById("chatForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // Lógica para enviar el mensaje del chat
      const mensaje = document.getElementById("chatInput").value;
      // Aquí deberías agregar la lógica para enviar el mensaje al servidor
      const chatMessages = document.getElementById("chatMessages");
      const newMessage = document.createElement("div");
      newMessage.classList.add("chat-message");
      newMessage.textContent = "Tú: " + mensaje;
      chatMessages.appendChild(newMessage);
      document.getElementById("chatForm").reset();
    });
});

function cargarHistorial() {
  // Obtener incidencias del localStorage
  const incidencias = JSON.parse(localStorage.getItem("incidencias")) || [];

  const tbody = document.getElementById("tablaDatos");
  tbody.innerHTML = "";
  incidencias.forEach((incidencia) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${incidencia.titulo}</td>
      <td>${incidencia.descripcion}</td>
      <td>${new Date(incidencia.fecha_creacion).toLocaleDateString()}</td>
      <td>${incidencia.categoria}</td>
      <td>${incidencia.archivo}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="verDetalle('${
          incidencia.titulo
        }', '${incidencia.descripcion}', '${incidencia.fecha_creacion}', '${
      incidencia.categoria
    }', '${incidencia.archivo}')">Ver Detalle</button>
        <button class="btn btn-sm btn-secondary" onclick="abrirChat()">Chatear</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function verDetalle(titulo, descripcion, fecha, categoria, archivo) {
  // Lógica para ver el detalle de la incidencia
  const detalleModalBody = document.getElementById("detalleModalBody");
  detalleModalBody.innerHTML = `
    <p><strong>Título:</strong> ${titulo}</p>
    <p><strong>Descripción:</strong> ${descripcion}</p>
    <p><strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString()}</p>
    <p><strong>Categoría:</strong> ${categoria}</p>
    <p><strong>Archivo:</strong> ${archivo}</p>
  `;
  $("#detalleModal").modal("show");
}

function abrirChat() {
  // Lógica para abrir el chat con el técnico
  $("#chatModal").modal("show");
}

document.addEventListener("DOMContentLoaded", function () {
  const incidentForm = document.getElementById("incidentForm");
  const successMsg = document.getElementById("successMsg");

  if (incidentForm) {
    incidentForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const title = document.getElementById("title").value;
      const fecha = document.getElementById("fecha").value;
      const categoria = document.getElementById("categoria").value;
      const description = document.getElementById("description").value;
      const fileInput = document.getElementById("file");
      const file = fileInput.files[0] ? fileInput.files[0].name : "";

      const incident = {
        title,
        fecha,
        categoria,
        description,
        file,
      };

      let incidents = JSON.parse(localStorage.getItem("incidents")) || [];
      incidents.push(incident);
      localStorage.setItem("incidents", JSON.stringify(incidents));

      successMsg.style.display = "block";
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 3000);

      incidentForm.reset();
    });
  }

  const tablaDatos = document.getElementById("tablaDatos");
  if (tablaDatos) {
    let incidents = JSON.parse(localStorage.getItem("incidents")) || [];
    incidents.forEach((incident) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${incident.title}</td>
        <td>${incident.description}</td>
        <td>${incident.fecha}</td>
        <td>${incident.categoria}</td>
        <td>${incident.file}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="viewDetails('${incident.title}', '${incident.description}', '${incident.fecha}', '${incident.categoria}', '${incident.file}')">Ver Detalles</button>
          <button class="btn btn-sm btn-secondary" onclick="openChat('${incident.title}')">Chatear</button>
        </td>
      `;
      tablaDatos.appendChild(row);
    });
  }
});

function viewDetails(title, description, fecha, categoria, file) {
  const detalleModalBody = document.getElementById("detalleModalBody");
  detalleModalBody.innerHTML = `
    <p><strong>Título:</strong> ${title}</p>
    <p><strong>Descripción:</strong> ${description}</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
    <p><strong>Categoría:</strong> ${categoria}</p>
    <p><strong>Archivo:</strong> ${file}</p>
  `;
  const detalleModal = new bootstrap.Modal(
    document.getElementById("detalleModal")
  );
  detalleModal.show();
}

function openChat(title) {
  const chatModal = new bootstrap.Modal(document.getElementById("chatModal"));
  chatModal.show();
  document.getElementById(
    "chatInput"
  ).placeholder = `Chateando sobre: ${title}`;
}

function handleSubmit(event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  // Mostrar el modal de éxito
  var successModal = new bootstrap.Modal(
    document.getElementById("successModal")
  );
  successModal.show();
}

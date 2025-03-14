import { isAuthenticated, getAccessToken, redirectToLoginIfNotAuthenticated, getUserId } from '../assets/js/auth.js';

// Cargar tickets al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  redirectToLoginIfNotAuthenticated();
  loadTickets();
});

// Crear un nuevo ticket
async function createTicket(event) {
  event.preventDefault();
  redirectToLoginIfNotAuthenticated();

  const ticketData = {
    titulo: document.getElementById('title').value,
    descripcion: document.getElementById('description').value,
    categoria: document.getElementById('categoria').value,
    cliente: getUserId(),  // Obtener ID del usuario desde auth.js
  };

  try {
    const response = await fetch('http://localhost:8000/tickets/crear/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });

    if (response.ok) {
      alert('Ticket creado exitosamente');
      window.location.reload();  // Recargar la página para mostrar el nuevo ticket
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.detail || 'Error al crear el ticket'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error en la conexión con el servidor');
  }
}

// Listar tickets
async function loadTickets() {
  redirectToLoginIfNotAuthenticated();

  try {
    const response = await fetch('http://localhost:8000/tickets/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
      },
    });

    if (response.ok) {
      const tickets = await response.json();
      renderTickets(tickets);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.detail || 'Error al cargar los tickets'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error en la conexión con el servidor');
  }
}

// Renderizar tickets en la tabla
function renderTickets(tickets) {
  const tbody = document.getElementById('tablaDatos');
  tbody.innerHTML = '';
  tickets.forEach(ticket => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${ticket.titulo}</td>
      <td>${ticket.descripcion}</td>
      <td>${new Date(ticket.fecha_creacion).toLocaleDateString()}</td>
      <td>${ticket.categoria}</td>
      <td>${ticket.archivo || 'N/A'}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="viewDetails(${ticket.n_ticket})">Ver Detalle</button>
        <button class="btn btn-sm btn-secondary" onclick="openChat(${ticket.n_ticket})">Chatear</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Ver detalles de un ticket
async function viewDetails(ticketId) {
  redirectToLoginIfNotAuthenticated();

  try {
    const response = await fetch(`http://localhost:8000/tickets/${ticketId}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
      },
    });

    if (response.ok) {
      const ticket = await response.json();
      const detalleModalBody = document.getElementById('detalleModalBody');
      detalleModalBody.innerHTML = `
        <p><strong>Título:</strong> ${ticket.titulo}</p>
        <p><strong>Descripción:</strong> ${ticket.descripcion}</p>
        <p><strong>Fecha:</strong> ${new Date(ticket.fecha_creacion).toLocaleDateString()}</p>
        <p><strong>Categoría:</strong> ${ticket.categoria}</p>
        <p><strong>Archivo:</strong> ${ticket.archivo || 'N/A'}</p>
      `;
      const detalleModal = new bootstrap.Modal(document.getElementById('detalleModal'));
      detalleModal.show();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.detail || 'Error al cargar los detalles del ticket'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error en la conexión con el servidor');
  }
}

// Eliminar un ticket
async function deleteTicket(ticketId) {
  redirectToLoginIfNotAuthenticated();

  try {
    const response = await fetch(`http://localhost:8000/tickets/${ticketId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
      },
    });

    if (response.ok) {
      alert('Ticket eliminado exitosamente');
      window.location.reload();  // Recargar la página para actualizar la lista
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.detail || 'Error al eliminar el ticket'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error en la conexión con el servidor');
  }
}

// Manejar el formulario de chat
document.getElementById('chatForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const mensaje = document.getElementById('chatInput').value;
  const chatMessages = document.getElementById('chatMessages');
  const newMessage = document.createElement('div');
  newMessage.classList.add('chat-message');
  newMessage.textContent = "Tú: " + mensaje;
  chatMessages.appendChild(newMessage);
  document.getElementById('chatForm').reset();
});

// Mostrar modal de éxito
function handleSubmit(event) {
  event.preventDefault();
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));
  successModal.show();
}
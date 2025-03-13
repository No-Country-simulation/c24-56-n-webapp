async function loadTickets() {
    try {
      const response = await fetch('http://localhost:8000/tickets/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
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
  
  function renderTickets(tickets) {
    const tbody = document.getElementById('tablaDatos');
    tbody.innerHTML = '';
    tickets.forEach(ticket => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${ticket.titulo}</td>
        <td>${ticket.descripcion}</td>
        <td>${new Date(ticket.fecha_creacion).toLocaleDateString()}</td>
        <td>${ticket.categoria}</td>
        <td>${ticket.archivo || 'N/A'}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="viewDetails(${ticket.id})">Ver Detalle</button>
          <button class="btn btn-sm btn-secondary" onclick="openChat(${ticket.id})">Chatear</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  document.addEventListener('DOMContentLoaded', loadTickets);
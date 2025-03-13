async function createTicket(event) {
    event.preventDefault();
  
    const ticketData = {
      titulo: document.getElementById('title').value,
      descripcion: document.getElementById('description').value,
      categoria: document.getElementById('categoria').value,
      cliente: localStorage.getItem('user_id'),  // Obtener ID del usuario desde localStorage
    };
  
    try {
      const response = await fetch('http://localhost:8000/tickets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(ticketData),
      });
  
      if (response.ok) {
        var successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail || 'Error al crear el ticket'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la conexión con el servidor');
    }
  }
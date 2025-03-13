async function loginUser(event) {
    event.preventDefault();
  
    const loginData = {
      email: document.getElementById('floatingInput').value,
      password: document.getElementById('floatingPassword').value,
    };
  
    try {
      const response = await fetch('http://localhost:8000/api/users/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);  // Guardar token en localStorage
        localStorage.setItem('refresh_token', data.refresh);
  
        // Redirigir según el rol del usuario
        const userRole = await getUserRole(data.access);
        redirectToDashboard(userRole);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail || 'Credenciales inválidas'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la conexión con el servidor');
    }
  }
  
  async function getUserRole(accessToken) {
    const response = await fetch('http://localhost:8000/api/users/me/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  
    if (response.ok) {
      const userData = await response.json();
      return userData.role;
    } else {
      throw new Error('Error al obtener el rol del usuario');
    }
  }
  
  function redirectToDashboard(role) {
    if (role === 'A') {
      window.location.href = '/frontend/dashboard administrador/index_administrador.html';
    } else if (role === 'T') {
      window.location.href = '/frontend/dashboard tecnico/index_tecnico.html';
    } else if (role === 'C') {
      window.location.href = '/frontend/dashboard cliente/index_cliente.html';
    }
  }
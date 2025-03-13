// Verificar si el usuario ya está autenticado
const accessToken = localStorage.getItem('access_token');
if (accessToken) {
  // Si hay un token, redirigir al dashboard correspondiente
  fetch('http://localhost:8000/api/users/me/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al obtener el rol del usuario');
      }
    })
    .then(userData => {
      if (userData.role === 'A') {
        window.location.href = '/frontend/dashboard administrador/index_administrador.html';
      } else if (userData.role === 'T') {
        window.location.href = '/frontend/dashboard tecnico/index_tecnico.html';
      } else if (userData.role === 'C') {
        window.location.href = '/frontend/dashboard cliente/index_cliente.html';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Si hay un error, eliminar el token y permitir el acceso a la página de registro
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    });
}
else {
    // None
}
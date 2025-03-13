async function logoutUser(event) {
    event.preventDefault(); // Evitar que el enlace redirija automáticamente
  
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
  
    if (!accessToken || !refreshToken) {
      alert('No hay una sesión activa.');
      window.location.href = '../sign-in/index.html';
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/users/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: accessToken,
          refresh_token: refreshToken,
        }),
      });
  
      if (response.ok) {
        // Eliminar tokens del localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
  
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '../sign-in/index.html';
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'No se pudo cerrar la sesión'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la conexión con el servidor');
    }
  }
// Verifica si el usuario está autenticado
function isAuthenticated() {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken;  // Devuelve true si hay un token, false si no
  }
  
// Obtiene el token de acceso
function getAccessToken() {
  return localStorage.getItem('access_token');
}

// Redirige al usuario a la página de inicio de sesión si no está autenticado
function redirectToLoginIfNotAuthenticated() {
  if (!isAuthenticated()) {
    alert('Debes iniciar sesión para acceder a esta página.');
    window.location.href = '../sign-in/index.html';
  }
}

// Obtiene el ID del usuario autenticado
function getUserId() {
  return localStorage.getItem('user_id');
}

// Exporta las funciones para su uso en otros archivos
export { isAuthenticated, getAccessToken, redirectToLoginIfNotAuthenticated, getUserId };
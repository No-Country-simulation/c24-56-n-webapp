async function registerUser(event) {
  event.preventDefault();

  const userData = {
    first_name: document.getElementById('floatingName').value,
    last_name: document.getElementById('floatingLastName').value,
    phone_number: document.getElementById('floatingPhone').value,
    email: document.getElementById('floatingEmail').value,
    password: document.getElementById('floatingPassword').value,
    confirm_password: document.getElementById('floatingConfirmPassword').value,
    role: document.getElementById('floatingRole').value,
  };

  try {
    const response = await fetch('http://localhost:8000/api/users/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      alert('Registro exitoso');
      window.location.href = '../sign-in/index.html';
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.detail || 'Error en el registro'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error en la conexión con el servidor');
  }
}
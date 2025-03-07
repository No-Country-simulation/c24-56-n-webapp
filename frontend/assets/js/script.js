let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];

function guardarIncidencia(incidencia) {
    try {
        incidencias.push(incidencia);
        localStorage.setItem('incidencias', JSON.stringify(incidencias));
    } catch (error) {
        console.error('Error al guardar:', error);
        alert('No se pudo guardar');
    }
}

function actualizarTabla() {
    const tbody = document.getElementById('tablaDatos');
    if (incidencias.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No hay incidencias registradas</td></tr>';
        return;
    }
    
    tbody.innerHTML = incidencias.map((inc, index) => `
        <tr>
            <td>${inc.titulo}</td>
            <td>${inc.descripcion}</td>
            <td>${inc.fecha}</td>
            <td>${inc.categoria}</td>
            <td>${inc.archivo}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="verDetalle(${index})">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="eliminarIncidencia(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function verDetalle(index) {
    const inc = incidencias[index];
    const modalBody = document.getElementById('detalleModalBody');
    modalBody.innerHTML = `
        <p><strong>Título:</strong> ${inc.titulo}</p>
        <p><strong>Descripción:</strong> ${inc.descripcion}</p>
        <p><strong>Fecha:</strong> ${inc.fecha}</p>
        <p><strong>Categoría:</strong> ${inc.categoria}</p>
        <p><strong>Archivo:</strong> ${inc.archivo}</p>
    `;
    new bootstrap.Modal(document.getElementById('detalleModal')).show();
}

function eliminarIncidencia(index) {
    incidencias.splice(index, 1);
    localStorage.setItem('incidencias', JSON.stringify(incidencias));
    actualizarTabla();
}

document.getElementById('incidentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const titulo = document.getElementById('title').value.trim();
    const fecha = document.getElementById('fecha').value;
    const categoria = document.getElementById('categoria').value;
    const descripcion = document.getElementById('description').value.trim();
    
    if (!titulo || !fecha || !categoria || !descripcion) {
        alert('Todos los campos son obligatorios');
        return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const fileInput = document.getElementById('file');
    let archivo = 'Sin archivo';

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (!allowedTypes.includes(file.type)) {
            alert('Tipo de archivo no permitido');
            return;
        }
        
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const extension = file.name.split('.').pop();
        archivo = `${titulo}_${timestamp}.${extension}`;
    }

    const incidencia = {
        titulo,
        fecha,
        categoria,
        descripcion,
        archivo
    };

    guardarIncidencia(incidencia);
    actualizarTabla();

    document.getElementById('successMsg').classList.add('show');
    setTimeout(() => {
        document.getElementById('successMsg').classList.remove('show');
    }, 3000);

    e.target.reset();
    document.getElementById('fileNameDisplay').textContent = '';
});

window.onload = actualizarTabla;

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  // Aquí deberías agregar la lógica para registrar al usuario
  // Por ejemplo, podrías hacer una llamada AJAX a tu servidor para registrar al usuario

  // Simulación de registro de usuario
  var userName = document.getElementById('floatingName').value;
  var userEmail = document.getElementById('floatingEmail').value;
  var userPassword = document.getElementById('floatingPassword').value;
  var userConfirmPassword = document.getElementById('floatingConfirmPassword').value;
  var userRole = document.getElementById('floatingRole').value;

  if (userPassword !== userConfirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Aquí puedes agregar la lógica para guardar los datos del usuario en tu servidor

  // Redirigir al usuario a la página correspondiente después del registro
  if (userRole === 'Administrador') {
    window.location.href = '/frontend/dashboard_administrador/index_administrador.html';
  } else if (userRole === 'Tecnico') {
    window.location.href = '/frontend/dashboard_tecnico/index_tecnico.html';
  } else if (userRole === 'Cliente') {
    window.location.href = '/frontend/dashboard_cliente/index_cliente.html';
  } else {
    window.location.href = '/frontend/sign-in/index.html';
  }
});
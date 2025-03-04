let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];

// Generar ID único
function generarID() {
    return `INC-${Date.now().toString(36).substr(2, 9).toUpperCase()}-${Math.floor(Math.random() * 1000000)}`;
}

// Función para guardar en localStorage
function guardarIncidencia(incidencia) {
    try {
        incidencias.push(incidencia);
        localStorage.setItem('incidencias', JSON.stringify(incidencias));
    } catch (error) {
        console.error('Error al guardar:', error);
        alert('No se pudo guardar');
    }
}

// Función para mostrar tabla
function actualizarTabla() {
    const tbody = document.getElementById('tablaDatos');
    if (incidencias.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8">No hay incidencias registradas</td></tr>';
        return;
    }
    
    tbody.innerHTML = incidencias.map((inc, index) => `
        <tr>
            <td>${inc.id}</td>
            <td>${inc.titulo}</td>
            <td><span class="badge bg-${inc.estado === 'recibida' ? 'warning' : inc.estado === 'en_proceso' ? 'info' : 'success'}">${inc.estado}</span></td>
            <td>${new Date(inc.fecha_creacion).toLocaleDateString()}</td>
            <td>${new Date(inc.fecha_modificacion).toLocaleDateString()}</td>
            <td>${inc.archivo || 'Sin archivo'}</td>
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

// Generar nombre de archivo al seleccionar
document.getElementById('archivo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const extension = file.name.split('.').pop();
        const newFileName = `INC_${timestamp}.${extension}`;
        document.getElementById('fileNameDisplay').textContent = 
            `Nombre del archivo: ${newFileName}`;
    }
});

// Manejar envío del formulario
document.getElementById('incidentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Generar ID único
    document.getElementById('id').value = generarID();
    
    // Obtener datos del formulario
    const id = document.getElementById('id').value;
    const titulo = document.getElementById('titulo').value.trim();
    const estado = document.getElementById('estado').value;
    const fecha_creacion = new Date().toISOString();
    const fecha_modificacion = new Date().toISOString();
    const descripcion = document.getElementById('descripcion').value.trim();
    let archivo = 'Sin archivo';
    
    // Generar nombre de archivo si existe
    const fileInput = document.getElementById('archivo');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const extension = file.name.split('.').pop();
        archivo = `INC_${timestamp}.${extension}`;
    }

    // Crear objeto incidencia
    const incidencia = {
        id,
        titulo,
        estado,
        fecha_creacion,
        fecha_modificacion,
        descripcion,
        archivo
    };

    // Guardar en localStorage y actualizar tabla
    guardarIncidencia(incidencia);
    actualizarTabla();

    // Mostrar mensaje de éxito
    document.getElementById('successMsg').classList.add('show');
    setTimeout(() => {
        document.getElementById('successMsg').classList.remove('show');
    }, 3000);

    // Limpiar campos
    e.target.reset();
    document.getElementById('fileNameDisplay').textContent = '';
});

// Función para ver detalles
function verDetalle(index) {
    const inc = incidencias[index];
    const modalBody = document.getElementById('detalleModalBody');
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <p><strong>ID:</strong> ${inc.id}</p>
                <p><strong>Título/Asunto:</strong> ${inc.titulo}</p>
                <p><strong>Estado:</strong> <span class="badge bg-${inc.estado === 'recibida' ? 'warning' : inc.estado === 'en_proceso' ? 'info' : 'success'}">${inc.estado}</span></p>
                <p><strong>Fecha Creación:</strong> ${new Date(inc.fecha_creacion).toLocaleDateString()}</p>
            </div>
        
        </div>
    `;
    new bootstrap.Modal(document.getElementById('detalleModal')).show();
}

// Función para eliminar incidencia
function eliminarIncidencia(index) {
    incidencias.splice(index, 1);
    localStorage.setItem('incidencias', JSON.stringify(incidencias));
    actualizarTabla();
}

// Cargar datos al iniciar
window.onload = actualizarTabla;


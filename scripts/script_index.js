// Función para guardar incidencia, porque no se está conectando a una API real
function saveIncident() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('incidentModal'));
    modal.hide();
    
    // Mostrar notificación de éxito
    const toast = new bootstrap.Toast(document.getElementById('successToast'));
    toast.show();
    
    // Limpiar formulario, porque la idea es que se pueda agregar más de una incidencia
    document.getElementById('incidentForm').reset();
}

// Inicialización después de cargar el DOM porque se están manipulando elementos del DOM, como botones y formularios, y 
// se necesita que estén cargados, para que se puedan manipular, sin obtener errores.
document.addEventListener('DOMContentLoaded', () => {
    // Manejar subida de archivos al hacer clic en el botón de subir archivo.
    document.querySelector('.file-upload').addEventListener('click', function() {
        this.querySelector('input').click();
    });

    // Datos de ejemplo para tener clara la estructura de las incidencias y como se renderizan y se manejan.
    const incidents = [
        { title: 'Error en servidor', status: 'Pendiente', date: '12-02-2025' },
        { title: 'Problema de red', status: 'En proceso', date: '12-02-2025' },
        { title: 'Caida de Windows', status: 'Resuelto', date: '13-02-2025' },
        { title: 'Problema con el mouse', status: 'Pendiente', date: '13-02-2025' }
    ];

    // Renderizar incidencias en la página principal para que el usuario pueda verlas.
    const incidentsList = document.getElementById('incidentsList');
    incidents.forEach(incident => {
        incidentsList.innerHTML += `
            <div class="col-md-6">
                <div class="card incident-card">
                    <div class="card-body">
                        <h5 class="card-title">${incident.title}</h5>
                        <p class="card-text">
                            <span class="badge bg-primary">${incident.status}</span>
                            <small class="text-muted ms-2">${incident.date}</small>
                        </p>
                    </div>
                </div>
            </div>
        `;
    });
});
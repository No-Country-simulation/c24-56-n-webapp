let paginaActual = 1; // Página inicial
const incidenciasPorPagina = 5; // Número de incidencias por página

// 1. Función para cambiar la página
function cambiarPagina(pagina) {
        paginaActual = pagina;
        cargarIncidencias();
}

// 2. Función para cargar las incidencias de la página actual
function cargarIncidencias() {
        const tbody = document.getElementById("incidenciasTable");
        tbody.innerHTML = ""; // Limpiar la tabla antes de cargar las nuevas incidencias

        // Calcular el rango de incidencias para la página actual
        const inicio = (paginaActual - 1) * incidenciasPorPagina;
        const fin = inicio + incidenciasPorPagina;
        const incidenciasPagina = incidencias.slice(inicio, fin);
        // Obtener incidencias correspondientes a la página

        // Agregar las incidencias a la tabla
        incidenciasPagina.forEach((incidencia) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
            <td>
              <a href="incidencias_tecnico.html?id=${incidencia.id}" class="text-decoration-none">${incidencia.id}</a>
            </td>
            <td>
              <a href="incidencias_tecnico.html?id=${incidencia.id}" class="text-decoration-none">${incidencia.titulo}</a>
            </td>
            <td>
              <a href="incidencias_tecnico.html?id=${incidencia.id}" class="text-decoration-none">${incidencia.estado}</a>
            </td>
            <td>
              <a href="incidencias_tecnico.html?id=${incidencia.id}" class="text-decoration-none">${incidencia.fecha}</a>
            </td>
            <td>
              <a href="incidencias_tecnico.html?id=${incidencia.id}" class="text-decoration-none">${incidencia.descripcion}</a>
            </td>
            <td>
              <button class="btn btn-sm btn-outline-primary me-2" onclick="verIncidencia(${incidencia.id})">
                <i class="bi bi-eye"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" onclick="confirmarEliminarIncidencia(${incidencia.id})">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          `;
                tbody.appendChild(tr);
        });
}

// Cargar las incidencias al cargar la página
window.onload = cargarIncidencias;

// Obtener el ID de la URL (parámetro 'id')
const params = new URLSearchParams(window.location.search);
const idIncidencia = params.get("id");

// Aquí puedes usar `idIncidencia` para cargar los detalles de la incidencia desde la base de datos
console.log(idIncidencia); // Muestra el ID en la consola para probar

// 3. Función para obtener datos de la tabla
function obtenerDatosDeTabla() {
        const estados = { Pendiente: 0, "En Progreso": 0, Resuelto: 0 };
        const filas = document.querySelectorAll("#incidenciasTable tr");
        filas.forEach((fila) => {
                const estado = fila.cells[2]?.textContent.trim();
                if (estado && estados.hasOwnProperty(estado)) {
                        estados[estado]++;
                }
        });
        return [estados["Pendiente"], estados["En Progreso"], estados["Resuelto"]];
}

import { DataManager } from './data-manager.js';
import { Toast } from './toast.js';

export class IncidentManager {
  static init() {
    this.currentFilters = {
      estado: 'todos',
      fecha: '',
      busqueda: ''
    };

    this.setupDOM();
    this.setupEventListeners();
    this.renderIncidencias();
  }

  static setupDOM() {
    this.dom = {
      tabla: document.getElementById('incidenciasTable'),
      filtroEstado: document.getElementById('filtroEstado'),
      busqueda: document.getElementById('busquedaGlobal'),
      fechaFilter: document.getElementById('filtroFecha')
    };
  }

  static setupEventListeners() {
    const handleFormSubmission = (formId, handler) => {
      const form = document.getElementById(formId);
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          handler.call(this);
        });
      }
    };

    handleFormSubmission('estadoForm', this.handleEstadoChange);
    handleFormSubmission('asignarTecnicoForm', this.handleAsignarTecnico);

    // Eventos de modales
    document.getElementById('estadoModal')?.addEventListener('show.bs.modal', (e) => {
      const button = e.relatedTarget;
      e.currentTarget.dataset.incidenciaId = button.dataset.incidenciaId;
    });

    document.getElementById('asignarTecnicoModal')?.addEventListener('show.bs.modal', (e) => {
      const button = e.relatedTarget;
      e.currentTarget.dataset.incidenciaId = button.dataset.incidenciaId;
      this.populateTecnicosDropdown();
    });

    // Filtros
    this.dom.filtroEstado?.addEventListener('change', () => this.applyFilters());
    this.dom.busqueda?.addEventListener('input', () => this.applyFilters());
    this.dom.fechaFilter?.addEventListener('change', () => this.applyFilters());
  }

  static applyFilters() {
    this.currentFilters = {
      estado: this.dom.filtroEstado.value,
      busqueda: this.dom.busqueda.value.toLowerCase(),
      fecha: this.dom.fechaFilter.value
    };
    this.renderIncidencias();
  }

  static renderIncidencias() {
    const filtered = DataManager.incidencias.filter(inc => {
      const matchEstado = this.currentFilters.estado === 'todos' || 
                         inc.estado === this.currentFilters.estado;
      const matchFecha = !this.currentFilters.fecha || 
                        inc.fecha.toISOString().split('T')[0] === this.currentFilters.fecha;
      const matchBusqueda = Object.values(inc).some(v => 
        String(v).toLowerCase().includes(this.currentFilters.busqueda)
      );
      
      return matchEstado && matchFecha && matchBusqueda;
    });

    this.renderTable(filtered);
  }

  static renderTable(incidencias) {
    this.dom.tabla.innerHTML = incidencias.map(inc => `
      <tr data-id="${inc.id}" class="${this.getRowClass(inc.estado)}">
        <td>${inc.id}</td>
        <td>${inc.titulo}</td>
        <td>${this.getEstadoBadge(inc.estado)}</td>
        <td>${inc.fecha.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })}</td>
        <td>${this.getTecnicoNombre(inc.tecnico)}</td>
        <td class="text-end">
          <div class="btn-group">
            ${this.generateActionButtons(inc.id)}
          </div>
        </td>
      </tr>
    `).join('');

    this.initTooltips();
  }

  static initTooltips() {
    const tooltipTriggerList = this.dom.tabla.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  static getRowClass(estado) {
    const classes = {
      recibida: 'table-warning',
      en_proceso: 'table-info',
      cerrada: 'table-success'
    };
    return classes[estado] || '';
  }

  static getEstadoBadge(estado) {
    const estados = {
      recibida: ['bg-warning', 'Recibida'],
      en_proceso: ['bg-info', 'En Proceso'],
      cerrada: ['bg-success', 'Cerrada']
    };
    const [clase, texto] = estados[estado] || ['bg-secondary', 'Desconocido'];
    return `<span class="badge ${clase}">${texto}</span>`;
  }

  static getTecnicoNombre(id) {
    const tecnico = DataManager.tecnicos.find(t => t.id === id);
    return tecnico ? `
      <span class="tecnico-info">
        ${tecnico.nombre} 
        <small class="text-muted">(${tecnico.estado})</small>
      </span>
    ` : '<em class="text-muted">Sin asignar</em>';
  }

  static generateActionButtons(id) {
    return `
      <button class="btn btn-sm btn-primary" 
              data-bs-toggle="modal" 
              data-bs-target="#estadoModal"
              data-incidencia-id="${id}"
              data-bs-tooltip="tooltip" 
              title="Cambiar estado">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-sm btn-info mx-2" 
              data-bs-toggle="modal" 
              data-bs-target="#asignarTecnicoModal"
              data-incidencia-id="${id}"
              data-bs-tooltip="tooltip" 
              title="Asignar técnico">
        <i class="bi bi-person-plus"></i>
      </button>
      <button class="btn btn-sm btn-success" 
              data-bs-toggle="modal" 
              data-bs-target="#chatModal"
              data-incidencia-id="${id}"
              data-bs-tooltip="tooltip" 
              title="Ver chat">
        <i class="bi bi-chat"></i>
      </button>
    `;
  }

  static handleEstadoChange() {
    const modal = document.getElementById('estadoModal');
    const incidencia = DataManager.getIncidenciaById(modal.dataset.incidenciaId);
    
    if (incidencia) {
      incidencia.estado = document.getElementById('estadoSelect').value;
      DataManager.saveData();
      this.renderIncidencias();
      Toast.show('Estado actualizado correctamente', 'success');
      bootstrap.Modal.getInstance(modal).hide();
    }
  }

  static handleAsignarTecnico() {
    const modal = document.getElementById('asignarTecnicoModal');
    const incidencia = DataManager.getIncidenciaById(modal.dataset.incidenciaId);
    
    if (incidencia) {
      incidencia.tecnico = document.getElementById('tecnicoSelect').value;
      DataManager.saveData();
      this.renderIncidencias();
      Toast.show('Técnico asignado correctamente', 'success');
      bootstrap.Modal.getInstance(modal).hide();
    }
  }

  static populateTecnicosDropdown() {
    const select = document.getElementById('tecnicoSelect');
    if (!select) return;

    select.innerHTML = DataManager.tecnicos
      .map(tec => `
        <option value="${tec.id}" 
                ${tec.estado !== 'disponible' ? 'disabled' : ''}>
          ${tec.nombre} (${tec.especialidad}) - ${tec.estado}
        </option>
      `).join('');
  }

  static showDetalles(id) {
    const incidencia = DataManager.getIncidenciaById(id);
    const modalContent = document.getElementById('detalleIncidenciaContent');
    
    modalContent.innerHTML = `
      <div class="row">
        <div class="col-md-4">
          <h6 class="fw-bold">${incidencia.titulo}</h6>
          <ul class="list-unstyled">
            <li><strong>ID:</strong> ${incidencia.id}</li>
            <li><strong>Fecha:</strong> ${incidencia.fecha.toLocaleString()}</li>
            <li><strong>Reportado por:</strong> ${incidencia.creador}</li>
            <li><strong>Técnico:</strong> ${this.getTecnicoNombre(incidencia.tecnico)}</li>
          </ul>
        </div>
        <div class="col-md-8">
          <h6 class="fw-bold">Descripción</h6>
          <p>${incidencia.descripcion}</p>
          ${incidencia.imagenes.map(img => `
            <img src="uploads/${img}" class="img-thumbnail me-2" style="max-height: 150px;">
          `).join('')}
        </div>
      </div>
    `;
    
    bootstrap.Modal.getOrCreateInstance('#detalleIncidenciaModal').show();
  }
}
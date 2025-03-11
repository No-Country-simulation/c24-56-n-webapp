// data-manager.js
class DataManager {
  static init() {
    this.incidencias = this._loadData('incidencias', [
      {
        id: "INC-001",
        titulo: "Impresora no funciona",
        descripcion: "La impresora de la oficina central no responde",
        estado: "recibida",
        fecha: new Date("2024-03-15T09:00"),
        tecnico: null,
        creador: "usuario@servidesk.com",
        chat: [
          {
            texto: "Hemos recibido su reporte",
            remitente: "sistema",
            fecha: new Date("2024-03-15T09:05")
          }
        ],
        imagenes: []
      },
      {
        id: "INC-002",
        titulo: "Error en software contable",
        descripcion: "El sistema muestra error al generar balances",
        estado: "en_proceso",
        fecha: new Date("2024-03-14T14:30"),
        tecnico: "tec2",
        creador: "contabilidad@servidesk.com",
        chat: [
          {
            texto: "Estamos revisando el problema",
            remitente: "tec2",
            fecha: new Date("2024-03-14T15:00")
          }
        ],
        imagenes: ["error-contable.jpg"]
      },
      {
        id: "INC-003",
        titulo: "Red lenta en oficina",
        descripcion: "La conexión de red es extremadamente lenta",
        estado: "cerrada",
        fecha: new Date("2024-03-13T11:15"),
        tecnico: "tec1",
        creador: "soporte@servidesk.com",
        chat: [
          {
            texto: "Problema resuelto",
            remitente: "tec1",
            fecha: new Date("2024-03-13T16:45")
          }
        ],
        imagenes: ["red-lenta.png"]
      }
    ]);

    this.usuarios = this._loadData('usuarios', [
      { 
        id: "usr1", 
        nombre: "Admin Principal",
        email: "admin@servidesk.com",
        rol: "admin",
        ultimoAcceso: new Date("2024-03-20T09:45"),
        activo: true
      },
      {
        id: "usr2",
        nombre: "Técnico Juan",
        email: "tecnico1@servidesk.com",
        rol: "tecnico",
        ultimoAcceso: new Date("2024-03-20T08:30"),
        activo: true
      },
      {
        id: "usr3",
        nombre: "Usuario Demo",
        email: "usuario@servidesk.com",
        rol: "usuario",
        ultimoAcceso: new Date("2024-03-19T16:20"),
        activo: true
      }
    ]);

    this.tecnicos = [
      { 
        id: "tec1", 
        nombre: "Juan Pérez", 
        estado: "disponible", 
        carga: 2,
        especialidad: "Redes"
      },
      { 
        id: "tec2", 
        nombre: "María Gómez", 
        estado: "ocupado", 
        carga: 5,
        especialidad: "Software"
      },
      { 
        id: "tec3", 
        nombre: "Carlos Ruiz", 
        estado: "disponible", 
        carga: 1,
        especialidad: "Hardware"
      }
    ];

    this.saveData();
  }

  static _loadData(key, defaultValue) {
    try {
      const data = JSON.parse(localStorage.getItem(key)) || defaultValue;
      return data.map(item => ({
        ...item,
        fecha: new Date(item.fecha),
        ...(item.chat && { chat: item.chat.map(m => ({ ...m, fecha: new Date(m.fecha) })) })
      }));
    } catch (e) {
      console.error(`Error loading ${key}:`, e);
      return defaultValue;
    }
  }

  static saveData() {
    try {
      localStorage.setItem('incidencias', JSON.stringify(this.incidencias));
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    } catch (e) {
      console.error('Error saving data:', e);
      Toast.show('Error al guardar datos', 'error');
    }
  }
}

// incident-manager.js
class IncidentManager {
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
      busqueda: document.getElementById('busquedaGlobal')
    };
  }

  static setupEventListeners() {
    // Verificar existencia de elementos antes de agregar listeners
    const estadoForm = document.getElementById('estadoForm');
    const asignarTecnicoForm = document.getElementById('asignarTecnicoForm');
    
    if (estadoForm) {
        estadoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEstadoChange();
        });
    } else {
        console.error('Formulario estadoForm no encontrado');
    }

    if (asignarTecnicoForm) {
        asignarTecnicoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAsignarTecnico();
        });
    } else {
        console.error('Formulario asignarTecnicoForm no encontrado');
    }

    // Verificar tabla antes de agregar listener
    const tabla = document.getElementById('incidenciasTable');
    if (tabla) {
        tabla.addEventListener('click', (e) => {
            const row = e.target.closest('tr[data-id]');
            if (row) this.showDetalles(row.dataset.id);
        });
    }
    this.dom.filtroEstado.addEventListener('change', () => this.applyFilters());
    this.dom.busqueda.addEventListener('input', () => this.applyFilters());
    
        // Configurar ID de incidencia al abrir modales
    document.getElementById('estadoModal').addEventListener('show.bs.modal', (e) => {
      const button = e.relatedTarget;
      e.currentTarget.dataset.incidenciaId = button.dataset.incidenciaId;
    });

    document.getElementById('asignarTecnicoModal').addEventListener('show.bs.modal', (e) => {
      const button = e.relatedTarget;
      e.currentTarget.dataset.incidenciaId = button.dataset.incidenciaId;
    });
  }

  static applyFilters() {
    this.currentFilters = {
      estado: this.dom.filtroEstado.value,
      busqueda: this.dom.busqueda.value.toLowerCase()
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
      <tr data-id="${inc.id}">
        <td>${inc.id}</td>
        <td>${inc.titulo}</td>
        <td>${this.getEstadoBadge(inc.estado)}</td>
        <td>${inc.fecha.toLocaleDateString()}</td>
        <td>${this.getTecnicoNombre(inc.tecnico)}</td>
        <td class="text-end">
          <div class="btn-group">
            ${this.generateActionButtons(inc.id)}
          </div>
        </td>
      </tr>
    `).join('');
        // Inicializar tooltips solo si existen
      const tooltipElements = this.dom.tabla.querySelectorAll('[data-bs-toggle="tooltip"]');
      if (tooltipElements.length > 0) {
          const tooltips = [].slice.call(tooltipElements);
          tooltips.forEach(t => new bootstrap.Tooltip(t));
      }
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
    return tecnico ? `${tecnico.nombre} (${tecnico.estado})` : 'Sin asignar';
  }

  static generateActionButtons(id) {
    return `
      <button class="btn btn-sm btn-primary" 
              data-bs-toggle="modal" 
              data-bs-target="#estadoModal"
              data-incidencia-id="${id}">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-sm btn-info mx-2" 
              data-bs-toggle="modal" 
              data-bs-target="#asignarTecnicoModal"
              data-incidencia-id="${id}">
        <i class="bi bi-person-plus"></i>
      </button>
      <button class="btn btn-sm btn-success" 
              data-bs-toggle="modal" 
              data-bs-target="#chatModal"
              data-incidencia-id="${id}">
        <i class="bi bi-chat"></i>
      </button>
    `;
  }

  static handleEstadoChange() {
    const modal = document.getElementById('estadoModal');
    const incidencia = DataManager.incidencias.find(i => i.id === modal.dataset.incidenciaId);
    
    if (incidencia) {
      incidencia.estado = document.getElementById('estadoSelect').value;
      DataManager.saveData();
      this.renderIncidencias();
      Toast.show('Estado actualizado correctamente', 'success');
      const modalInstance = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
      modalInstance.hide();
    }
  }

  static handleAsignarTecnico() {
    const modal = document.getElementById('asignarTecnicoModal');
    const incidencia = DataManager.incidencias.find(i => i.id === modal.dataset.incidenciaId);
    
    if (incidencia) {
      incidencia.tecnico = document.getElementById('tecnicoSelect').value;
      DataManager.saveData();
      this.renderIncidencias();
      Toast.show('Técnico asignado correctamente', 'success');
      bootstrap.Modal.getInstance(modal).hide();
    }
  }

  static showDetalles(id) {
    const incidencia = DataManager.incidencias.find(i => i.id === id);
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
            <img src="${img}" class="img-thumbnail me-2" style="max-height: 150px;">
          `).join('')}
        </div>
      </div>
    `;
    
    bootstrap.Modal.getOrCreateInstance('#detalleIncidenciaModal').show();
  }
}

// user-manager.js
class UserManager {
  static init() {
    this.setupDOM();
    this.setupEventListeners();
    this.renderUsuarios();
  }

  static setupDOM() {
    this.dom = {
      tabla: document.getElementById('usuariosTable'),
      form: document.getElementById('editarUsuarioForm'),
      modal: document.getElementById('editarUsuarioModal')
    };
  }

  static setupEventListeners() {
    this.dom.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.dom.modal.addEventListener('show.bs.modal', (e) => {
      const button = e.relatedTarget;
      const userId = button.dataset.userId;
      this.loadUserData(userId);
    });
    
    document.getElementById('eliminarUsuarioBtn').addEventListener('click', () => {
      this.handleDeleteUser();
    });
  }

  static renderUsuarios() {
    this.dom.tabla.innerHTML = DataManager.usuarios.map(usuario => `
      <tr data-user-id="${usuario.id}">
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${this.getRolBadge(usuario.rol)}</td>
        <td>${usuario.ultimoAcceso.toLocaleString()}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-secondary" 
                  data-bs-toggle="modal" 
                  data-bs-target="#editarUsuarioModal"
                  data-user-id="${usuario.id}">
            <i class="bi bi-pencil-square"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  static getRolBadge(rol) {
    const roles = {
      admin: ['bg-danger', 'Administrador'],
      tecnico: ['bg-primary', 'Técnico'],
      usuario: ['bg-success', 'Usuario']
    };
    const [clase, texto] = roles[rol] || ['bg-secondary', 'Desconocido'];
    return `<span class="badge ${clase}">${texto}</span>`;
  }

  static loadUserData(userId) {
    const usuario = DataManager.usuarios.find(u => u.id === userId) || {};
    this.dom.modal.dataset.userId = usuario.id || '';
    document.getElementById('nombreUsuario').value = usuario.nombre || '';
    document.getElementById('emailUsuario').value = usuario.email || '';
    document.getElementById('rolUsuario').value = usuario.rol || 'usuario';
  }

  static handleSubmit(e) {
    e.preventDefault();
    
    const usuario = {
      id: this.dom.modal.dataset.userId || `usr${Date.now()}`,
      nombre: document.getElementById('nombreUsuario').value,
      email: document.getElementById('emailUsuario').value,
      rol: document.getElementById('rolUsuario').value,
      ultimoAcceso: new Date()
    };

    if (!this.validateUser(usuario)) return;

    const index = DataManager.usuarios.findIndex(u => u.id === usuario.id);
    if (index >= 0) {
      DataManager.usuarios[index] = usuario;
    } else {
      DataManager.usuarios.push(usuario);
    }

    DataManager.saveData();
    this.renderUsuarios();
    Toast.show('Usuario guardado correctamente', 'success');
    bootstrap.Modal.getInstance(this.dom.modal).hide();
  }

  static validateUser(usuario) {
    if (!usuario.nombre || usuario.nombre.length < 5) {
      Toast.show('Nombre debe tener al menos 5 caracteres', 'warning');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
      Toast.show('Email inválido', 'warning');
      return false;
    }
    
    return true;
  }

  static handleDeleteUser() {
    const userId = this.dom.modal.dataset.userId;
    DataManager.usuarios = DataManager.usuarios.filter(u => u.id !== userId);
    DataManager.saveData();
    this.renderUsuarios();
    Toast.show('Usuario eliminado', 'success');
    bootstrap.Modal.getInstance(this.dom.modal).hide();
  }
}

// report-manager.js
class ReportManager {
  static exportCSV() {
    const csvContent = [
      ['ID', 'Título', 'Estado', 'Técnico', 'Fecha', 'Descripción'],
      ...DataManager.incidencias.map(inc => [
        inc.id,
        `"${inc.titulo.replace(/"/g, '""')}"`,
        inc.estado,
        this.getTecnicoNombre(inc.tecnico),
        inc.fecha.toISOString(),
        `"${(inc.descripcion || '').replace(/"/g, '""')}"`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reporte-${new Date().toISOString()}.csv`;
    link.click();
  }

  static generatePDF() {
    const doc = new jspdf.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFontSize(18);
    doc.text('Reporte de Incidencias', 14, 20);
    doc.setFontSize(12);
    doc.text(`Generado: ${new Date().toLocaleString()}`, 14, 28);

    doc.autoTable({
      head: [['ID', 'Título', 'Estado', 'Técnico', 'Fecha']],
      body: DataManager.incidencias.map(inc => [
        inc.id,
        inc.titulo,
        inc.estado.toUpperCase(),
        this.getTecnicoNombre(inc.tecnico),
        inc.fecha.toLocaleDateString()
      ]),
      startY: 35,
      styles: { cellPadding: 3, fontSize: 10 },
      headStyles: { fillColor: [44, 62, 80] }
    });

    doc.save(`reporte-${new Date().toISOString()}.pdf`);
  }

  static getTecnicoNombre(id) {
    const tecnico = DataManager.tecnicos.find(t => t.id === id);
    return tecnico ? tecnico.nombre : 'Sin asignar';
  }
}

// chat-manager.js
class ChatManager {
  static init() {
    this.currentChat = null;
    this.setupEventListeners();
  }

  static setupEventListeners() {
    document.getElementById('chatForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendMessage();
    });

    document.getElementById('chatModal').addEventListener('show.bs.modal', (e) => {
      const button = e.relatedTarget;
      this.currentChat = DataManager.incidencias.find(i => i.id === button.dataset.incidenciaId);
      this.renderChat();
    });
  }

  static renderChat() {
    const container = document.getElementById('chatMessages');
    container.innerHTML = this.currentChat.chat.map(msg => `
      <div class="chat-message ${msg.remitente === 'sistema' ? 'system' : 'user'}">
        <div class="message-header">
          <span class="sender">${this.getSenderName(msg.remitente)}</span>
          <span class="time">${msg.fecha.toLocaleTimeString()}</span>
        </div>
        <div class="message-content">${msg.texto}</div>
      </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
  }

  static getSenderName(remitente) {
    const user = DataManager.usuarios.find(u => u.email === remitente);
    return user ? user.nombre : remitente;
  }

  static sendMessage() {
    const input = document.getElementById('mensajeChat');
    const texto = input.value.trim();
    
    if (texto && this.currentChat) {
      this.currentChat.chat.push({
        texto: texto,
        remitente: 'admin',
        fecha: new Date()
      });
      
      DataManager.saveData();
      this.renderChat();
      input.value = '';
    }
  }
}

// alert-manager.js
class AlertManager {
  static init() {
    this.config = {
      alertas: {
        sinAsignar: true,
        tiempoRespuesta: true
      },
      notificaciones: {
        email: true,
        sms: false
      }
    };
    
    this.setupEventListeners();
    this.checkAlertas();
  }

  static setupEventListeners() {
    document.getElementById('alertasForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveConfig();
    });
  }

  static saveConfig() {
    this.config = {
      alertas: {
        sinAsignar: document.getElementById('alertaSinAsignar').checked,
        tiempoRespuesta: document.getElementById('alertaTiempoRespuesta').checked
      },
      notificaciones: {
        email: document.getElementById('notificacionEmail').checked,
        sms: document.getElementById('notificacionSMS').checked
      }
    };
    
    Toast.show('Configuración guardada', 'success');
  }

  static checkAlertas() {
    DataManager.incidencias.forEach(inc => {
      if (!inc.tecnico && this.config.alertas.sinAsignar) {
        this.triggerAlerta(inc, 'Incidencia sin asignar por más de 1 hora');
      }
      
      if (inc.estado === 'recibida' && this.config.alertas.tiempoRespuesta) {
        const horas = (new Date() - inc.fecha) / 3600000;
        if (horas > 24) {
          this.triggerAlerta(inc, `Tiempo de respuesta excedido (${Math.floor(horas)} horas)`);
        }
      }
    });
  }

  static triggerAlerta(incidencia, mensaje) {
    Toast.show(`${incidencia.id}: ${mensaje}`, 'warning');
  }
}

// toast.js
class Toast {
  static show(message, type = 'info') {
    const container = document.querySelector('.toast-container');
    const toastId = `toast-${Date.now()}`;
    const icons = {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle'
    };

    const toastHTML = `
      <div id="${toastId}" class="toast fade-in" role="alert">
        <div class="toast-header bg-${type} text-white">
          <i class="bi bi-${icons[type]} me-2"></i>
          <strong class="me-auto">${type.toUpperCase()}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">${message}</div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', toastHTML);
    const toast = new bootstrap.Toast(document.getElementById(toastId), {
      autohide: true,
      delay: 5000
    });
    toast.show();

    setTimeout(() => toast.dispose(), 6000);
  }
}

// app.js
document.addEventListener('DOMContentLoaded', () => {
  DataManager.init();
  IncidentManager.init();
  UserManager.init();
  ChatManager.init();
  AlertManager.init();
  const elementosRequeridos = [
    '#incidenciasTable',
    '#estadoForm',
    '#asignarTecnicoForm',
    '#usuariosTable'
];
const todosPresentes = elementosRequeridos.every(selector => {
  const element = document.querySelector(selector);
  if (!element) console.error(`Elemento no encontrado: ${selector}`);
  return !!element;
});

if (todosPresentes) {
  DataManager.init();
  IncidentManager.init();
  UserManager.init();
  ChatManager.init();
  AlertManager.init();
  
} else {
  console.error('No se pueden inicializar los módulos - Elementos faltantes');
}

  document.getElementById('logoutButton').addEventListener('click', () => {
    if (confirm('¿Está seguro de cerrar sesión?')) {
      window.location.href = '/login';
    }
  });

  // Inicializar tooltips
  const tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltips.forEach(t => new bootstrap.Tooltip(t));
});
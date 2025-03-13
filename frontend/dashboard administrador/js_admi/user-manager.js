import { DataManager } from './data-manager.js';
import { Toast } from './toast.js';

export class UserManager {
  static init() {
    this.setupDOM();
    this.setupEventListeners();
    this.renderUsuarios();
  }

  static setupDOM() {
    this.dom = {
      tabla: document.getElementById('usuariosTable'),
      form: document.getElementById('editarUsuarioForm'),
      modal: document.getElementById('editarUsuarioModal'),
      deleteBtn: document.getElementById('eliminarUsuarioBtn')
    };
  }

  static setupEventListeners() {
    // Formulario de edición
    if (this.dom.form) {
      this.dom.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Evento al mostrar el modal
    this.dom.modal?.addEventListener('show.bs.modal', (e) => {
      const button = e.relatedTarget;
      this.loadUserData(button.dataset.userId);
    });

    // Botón de eliminar
    this.dom.deleteBtn?.addEventListener('click', () => this.handleDeleteUser());
  }

  static renderUsuarios() {
    if (!this.dom.tabla) return;

    this.dom.tabla.innerHTML = DataManager.usuarios.map(usuario => `
      <tr data-user-id="${usuario.id}">
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${this.getRolBadge(usuario.rol)}</td>
        <td>${usuario.ultimoAcceso.toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-secondary" 
                  data-bs-toggle="modal" 
                  data-bs-target="#editarUsuarioModal"
                  data-user-id="${usuario.id}"
                  data-bs-tooltip="tooltip"
                  title="Editar usuario">
            <i class="bi bi-pencil-square"></i>
          </button>
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
      nombre: document.getElementById('nombreUsuario').value.trim(),
      email: document.getElementById('emailUsuario').value.trim(),
      rol: document.getElementById('rolUsuario').value,
      ultimoAcceso: new Date(),
      activo: true
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
      Toast.show('El nombre debe tener al menos 5 caracteres', 'warning');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
      Toast.show('Por favor ingrese un email válido', 'warning');
      return false;
    }
    
    if (DataManager.usuarios.some(u => u.email === usuario.email && u.id !== usuario.id)) {
      Toast.show('Este email ya está registrado', 'warning');
      return false;
    }
    
    return true;
  }

  static handleDeleteUser() {
    const userId = this.dom.modal.dataset.userId;
    
    if (!confirm('¿Está seguro de eliminar este usuario permanentemente?')) return;

    DataManager.usuarios = DataManager.usuarios.filter(u => u.id !== userId);
    DataManager.saveData();
    this.renderUsuarios();
    Toast.show('Usuario eliminado correctamente', 'success');
    bootstrap.Modal.getInstance(this.dom.modal).hide();
  }
}
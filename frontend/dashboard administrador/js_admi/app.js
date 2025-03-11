import { DataManager } from './data-manager.js';
import { IncidentManager } from './incident-manager.js';
import { UserManager } from './user-manager.js';
import { ChatManager } from './chat-manager.js';
import { AlertManager } from './alert-manager.js';
import { Toast } from './toast.js';

document.addEventListener('DOMContentLoaded', () => {
  // Verificar elementos requeridos en el DOM
  const elementosRequeridos = [
    '#incidenciasTable',
    '#usuariosTable',
    '#estadoForm',
    '#asignarTecnicoForm'
  ];

  const elementosFaltantes = elementosRequeridos.filter(selector => !document.querySelector(selector));
  
  if (elementosFaltantes.length > 0) {
    console.error('Elementos requeridos faltantes:', elementosFaltantes);
    return;
  }

  // Inicializar módulos principales
  try {
    DataManager.init();
    IncidentManager.init();
    UserManager.init();
    ChatManager.init();
    AlertManager.init();
  } catch (error) {
    console.error('Error inicializando módulos:', error);
    Toast.show('Error crítico al inicializar la aplicación', 'error');
    return;
  }

  // Configuración general de la aplicación
  const setupGeneral = () => {
    // Tooltips
    const tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltips.forEach(t => new bootstrap.Tooltip(t));

    // Logout
    document.getElementById('logoutButton').addEventListener('click', () => {
      if (confirm('¿Está seguro de cerrar sesión?')) {
        window.location.href = '/login';
      }
    });

    // Handlers de reportes
    document.getElementById('exportarCSV')?.addEventListener('click', () => ReportManager.exportCSV());
    document.getElementById('generarPDF')?.addEventListener('click', () => ReportManager.generatePDF());
  };

  // Inicializar configuración general
  try {
    setupGeneral();
  } catch (error) {
    console.error('Error en configuración general:', error);
    Toast.show('Error en configuración de la aplicación', 'error');
  }
});
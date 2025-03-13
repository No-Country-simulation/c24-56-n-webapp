import { DataManager } from './data-manager.js';
import { Toast } from './toast.js';

export class AlertManager {
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
    const alertasForm = document.getElementById('alertasForm');
    if (alertasForm) {
      alertasForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveConfig();
      });
    }
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
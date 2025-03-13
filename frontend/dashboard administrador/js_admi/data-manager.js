import { Toast } from './toast.js';

export class DataManager {
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
        fecha: item.fecha ? new Date(item.fecha) : new Date(),
        ...(item.chat && {
          chat: item.chat.map(m => ({
            ...m,
            fecha: new Date(m.fecha)
          }))
        }),
        ...(item.ultimoAcceso && { 
          ultimoAcceso: new Date(item.ultimoAcceso) 
        })
      }));
    } catch (e) {
      console.error(`Error loading ${key}:`, e);
      Toast.show(`Error cargando ${key}`, 'error');
      return defaultValue;
    }
  }

  static saveData() {
    try {
      localStorage.setItem('incidencias', JSON.stringify(this.incidencias));
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      localStorage.setItem('tecnicos', JSON.stringify(this.tecnicos));
    } catch (e) {
      console.error('Error saving data:', e);
      Toast.show('Error al guardar datos', 'error');
    }
  }

  static getIncidenciaById(id) {
    return this.incidencias.find(inc => inc.id === id);
  }

  static getTecnicoById(id) {
    return this.tecnicos.find(tec => tec.id === id);
  }

  static getUsuarioByEmail(email) {
    return this.usuarios.find(user => user.email === email);
  }
}
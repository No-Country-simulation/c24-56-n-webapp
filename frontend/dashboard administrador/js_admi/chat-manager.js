import { DataManager } from './data-manager.js';
import { Toast } from './toast.js';

export class ChatManager {
  static init() {
    this.currentChat = null;
    this.setupEventListeners();
  }

  static setupEventListeners() {
    const chatForm = document.getElementById('chatForm');
    const chatModal = document.getElementById('chatModal');
    
    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.sendMessage();
      });
    }

    if (chatModal) {
      chatModal.addEventListener('show.bs.modal', (e) => {
        const button = e.relatedTarget;
        this.currentChat = DataManager.incidencias.find(
          i => i.id === button.dataset.incidenciaId
        );
        this.renderChat();
      });
    }
  }

  static renderChat() {
    if (!this.currentChat) return;
    
    const container = document.getElementById('chatMessages');
    if (!container) return;

    // Convertir fechas strings a Date si es necesario
    this.currentChat.chat.forEach(msg => {
      if (typeof msg.fecha === 'string') {
        msg.fecha = new Date(msg.fecha);
      }
    });

    container.innerHTML = this.currentChat.chat.map(msg => `
      <div class="chat-message ${msg.remitente === 'sistema' ? 'system' : 'user'}">
        <div class="message-header">
          <span class="sender">${this.getSenderName(msg.remitente)}</span>
          <span class="time">${msg.fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div class="message-content">${msg.texto}</div>
      </div>
    `).join('');
    
    container.scrollTop = container.scrollHeight;
  }

  static getSenderName(remitente) {
    if (remitente === 'sistema') return 'Sistema';
    if (remitente === 'admin') return 'Administrador';
    
    const user = DataManager.usuarios.find(u => u.email === remitente);
    return user ? user.nombre : remitente;
  }

  static sendMessage() {
    const input = document.getElementById('mensajeChat');
    if (!input || !this.currentChat) return;

    const texto = input.value.trim();
    if (!texto) {
      Toast.show('El mensaje no puede estar vacío', 'warning');
      return;
    }

    this.currentChat.chat.push({
      texto: texto,
      remitente: 'admin',  // Asume que el remitente es el admin
      fecha: new Date()
    });
    
    DataManager.saveData();
    this.renderChat();
    input.value = '';
    input.focus();
  }
}
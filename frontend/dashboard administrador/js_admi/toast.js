export class Toast {
    static config = {
      duration: 5000,
      types: {
        success: {
          icon: 'check-circle',
          color: 'success'
        },
        error: {
          icon: 'x-circle',
          color: 'danger'
        },
        warning: {
          icon: 'exclamation-triangle',
          color: 'warning'
        },
        info: {
          icon: 'info-circle',
          color: 'info'
        }
      }
    };
  
    static show(message, type = 'info') {
      const container = this.getToastContainer();
      const toastId = `toast-${Date.now()}`;
      const { icon, color } = this.config.types[type] || this.config.types.info;
  
      const toastHTML = `
        <div id="${toastId}" 
             class="toast align-items-center border-0 fade show" 
             role="alert" 
             aria-live="assertive" 
             aria-atomic="true"
             data-bs-autohide="true"
             data-bs-delay="${this.config.duration}">
          <div class="toast-header bg-${color} text-white">
            <i class="bi bi-${icon} me-2"></i>
            <strong class="me-auto">${type.toUpperCase()}</strong>
            <button type="button" 
                    class="btn-close btn-close-white" 
                    data-bs-dismiss="toast"
                    aria-label="Close"></button>
          </div>
          <div class="toast-body">${message}</div>
        </div>
      `;
  
      container.insertAdjacentHTML('beforeend', toastHTML);
      const toastElement = document.getElementById(toastId);
      const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: this.config.duration
      });
  
      toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
      });
  
      toast.show();
    }
  
    static getToastContainer() {
      let container = document.querySelector('.toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '1060';
        document.body.appendChild(container);
      }
      return container;
    }
  }
// src/utils/mobileUtils.js
export const mobileUtils = {
  // Prevenir zoom en iOS cuando se toca un input
  preventZoom: () => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }
  },

  // Restaurar zoom
  allowZoom: () => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.content = 'width=device-width, initial-scale=1.0';
    }
  },

  // Verificar si es un dispositivo táctil
  isTouchDevice: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  // Verificar si es iOS
  isIOS: () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  },

  // Verificar si es Android
  isAndroid: () => {
    return /Android/.test(navigator.userAgent);
  },

  // Verificar si está en modo standalone (PWA)
  isStandalone: () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
  },

  // Obtener la altura de la ventana sin barras del navegador
  getViewportHeight: () => {
    return window.innerHeight || document.documentElement.clientHeight;
  },

  // Scroll suave a elemento
  scrollToElement: (element, offset = 0) => {
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  },

  // Formatear fecha para móvil (más compacto)
  formatDateMobile: (date) => {
    const now = new Date();
    const targetDate = new Date(date);
    const diffDays = Math.floor((now - targetDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays === -1) return 'Mañana';
    if (diffDays > 1 && diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < -1 && diffDays > -7) return `En ${Math.abs(diffDays)} días`;
    
    return targetDate.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  },

  // Formatear hora para móvil
  formatTimeMobile: (date) => {
    return new Date(date).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Truncar texto para móvil
  truncateText: (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  // Generar color basado en string (para avatares, etc.)
  stringToColor: (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  },

  // Validar formato de email
  isValidEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Debounce para search en móvil
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle para scroll events
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Obtener coordenadas del touch
  getTouchCoordinates: (e) => {
    const touch = e.touches[0] || e.changedTouches[0];
    return {
      x: touch.clientX,
      y: touch.clientY
    };
  },

  // Calcular distancia entre dos puntos (para gestos)
  calculateDistance: (point1, point2) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  },

  // Guardar en localStorage con manejo de errores
  saveToStorage: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  // Leer de localStorage con manejo de errores
  getFromStorage: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  // Limpiar datos antiguos del localStorage
  cleanOldStorage: (maxAge = 7 * 24 * 60 * 60 * 1000) => { // 7 días por defecto
    const now = Date.now();
    Object.keys(localStorage).forEach(key => {
      try {
        const item = JSON.parse(localStorage.getItem(key));
        if (item && item.timestamp && (now - item.timestamp > maxAge)) {
          localStorage.removeItem(key);
        }
      } catch (error) {
        // Si no se puede parsear, probablemente no es nuestro formato
      }
    });
  }
};
// src/utils/performanceUtils.js
export const performanceUtils = {
  // Lazy loading para imágenes
  lazyLoadImage: (img, src, placeholder = '') => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = src;
            image.classList.remove('lazy');
            observer.unobserve(image);
          }
        });
      });
      
      img.src = placeholder;
      img.classList.add('lazy');
      observer.observe(img);
    } else {
      // Fallback para navegadores sin soporte
      img.src = src;
    }
  },

  // Precargar imágenes críticas
  preloadImages: (imageUrls) => {
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  },

  // Medir performance de funciones
  measurePerformance: (name, fn) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    console.log(`${name} tomó ${end - start} milisegundos`);
    return result;
  },

  // Optimizar renderizado con requestIdleCallback
  scheduleWork: (work, options = {}) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(work, options);
    } else {
      // Fallback
      setTimeout(work, 0);
    }
  }
};
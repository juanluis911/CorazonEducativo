// src/utils/animationUtils.js
export const animationUtils = {
  // Easing functions para animaciones personalizadas
  easing: {
    easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOut: (t) => t * (2 - t),
    easeIn: (t) => t * t,
    bounceOut: (t) => {
      if (t < 1 / 2.75) {
        return 7.5625 * t * t;
      } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
      } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
      } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      }
    }
  },

  // Animar valor numérico
  animateValue: (start, end, duration, callback, easingFunction = animationUtils.easing.easeInOut) => {
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easingFunction(progress);
      const currentValue = start + (end - start) * easedProgress;
      
      callback(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  },

  // Animar scroll
  animateScroll: (element, targetScrollTop, duration = 300) => {
    const startScrollTop = element.scrollTop;
    const distance = targetScrollTop - startScrollTop;
    
    animationUtils.animateValue(
      startScrollTop,
      targetScrollTop,
      duration,
      (value) => {
        element.scrollTop = value;
      }
    );
  }
};
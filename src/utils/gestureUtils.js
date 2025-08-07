// src/utils/gestureUtils.js
export const gestureUtils = {
  // Detectar gesto de pinch (zoom)
  detectPinch: (touches) => {
    if (touches.length !== 2) return null;
    
    const touch1 = touches[0];
    const touch2 = touches[1];
    
    return {
      center: {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2
      },
      distance: mobileUtils.calculateDistance(
        { x: touch1.clientX, y: touch1.clientY },
        { x: touch2.clientX, y: touch2.clientY }
      )
    };
  },

  // Detectar rotación
  detectRotation: (touch1, touch2, prevTouch1, prevTouch2) => {
    const angle1 = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX);
    const angle2 = Math.atan2(prevTouch2.clientY - prevTouch1.clientY, prevTouch2.clientX - prevTouch1.clientX);
    
    return angle1 - angle2;
  },

  // Determinar dirección del swipe
  getSwipeDirection: (startX, startY, endX, endY, threshold = 30) => {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) {
      return null; // No hay swipe significativo
    }
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  }
};

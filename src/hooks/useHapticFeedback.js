// src/hooks/useHapticFeedback.js
export const useHapticFeedback = () => {
  const vibrate = (pattern = [100]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const lightImpact = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10]);
    }
  };

  const mediumImpact = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([20]);
    }
  };

  const heavyImpact = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([40]);
    }
  };

  const success = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 10]);
    }
  };

  const error = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 50, 50]);
    }
  };

  return {
    vibrate,
    lightImpact,
    mediumImpact,
    heavyImpact,
    success,
    error,
  };
};
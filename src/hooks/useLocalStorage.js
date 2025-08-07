// src/hooks/useLocalStorage.js
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    return mobileUtils.getFromStorage(key, initialValue);
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Agregar timestamp para limpieza automática
      const dataWithTimestamp = {
        data: valueToStore,
        timestamp: Date.now()
      };
      
      mobileUtils.saveToStorage(key, dataWithTimestamp);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};
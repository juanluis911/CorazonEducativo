// src/context/SettingsContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings debe ser usado dentro de SettingsProvider');
  }
  return context;
};

// Estado inicial
const initialState = {
  theme: 'light', // 'light', 'dark'
  language: 'es', // 'es', 'en'
  notifications: {
    email: true,
    push: true,
    taskReminders: true,
    announcements: true,
    weeklyDigest: false
  },
  calendar: {
    startWeek: 'monday', // 'monday', 'sunday'
    defaultView: 'month', // 'month', 'week', 'day'
    showWeekends: true,
    timeFormat: '24h' // '12h', '24h'
  },
  tasks: {
    defaultPriority: 'medium',
    showCompleted: true,
    sortBy: 'dueDate', // 'dueDate', 'priority', 'subject', 'created'
    sortOrder: 'asc' // 'asc', 'desc'
  },
  dashboard: {
    showUpcomingTasks: true,
    showRecentAnnouncements: true,
    tasksLimit: 5,
    announcementsLimit: 3
  },
  privacy: {
    shareCalendar: false,
    showOnlineStatus: true,
    allowDataCollection: true
  }
};

// Acciones
const ACTIONS = {
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  UPDATE_NOTIFICATIONS: 'UPDATE_NOTIFICATIONS',
  UPDATE_CALENDAR: 'UPDATE_CALENDAR',
  UPDATE_TASKS: 'UPDATE_TASKS',
  UPDATE_DASHBOARD: 'UPDATE_DASHBOARD',
  UPDATE_PRIVACY: 'UPDATE_PRIVACY',
  RESET_SETTINGS: 'RESET_SETTINGS',
  LOAD_SETTINGS: 'LOAD_SETTINGS'
};

// Reducer
const settingsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    
    case ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    
    case ACTIONS.UPDATE_NOTIFICATIONS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...action.payload
        }
      };
    
    case ACTIONS.UPDATE_CALENDAR:
      return {
        ...state,
        calendar: {
          ...state.calendar,
          ...action.payload
        }
      };
    
    case ACTIONS.UPDATE_TASKS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          ...action.payload
        }
      };
    
    case ACTIONS.UPDATE_DASHBOARD:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          ...action.payload
        }
      };
    
    case ACTIONS.UPDATE_PRIVACY:
      return {
        ...state,
        privacy: {
          ...state.privacy,
          ...action.payload
        }
      };
    
    case ACTIONS.RESET_SETTINGS:
      return initialState;
    
    case ACTIONS.LOAD_SETTINGS:
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
};

export const SettingsProvider = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialState);

  // Cargar configuraciones desde localStorage al inicializar
  useEffect(() => {
    const savedSettings = localStorage.getItem('agendaEscolarSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        dispatch({ type: ACTIONS.LOAD_SETTINGS, payload: parsedSettings });
      } catch (error) {
        console.error('Error al cargar configuraciones guardadas:', error);
      }
    }
  }, []);

  // Guardar configuraciones en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('agendaEscolarSettings', JSON.stringify(settings));
  }, [settings]);

  // Aplicar tema al documento
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Funciones de configuración
  const updateTheme = (theme) => {
    dispatch({ type: ACTIONS.SET_THEME, payload: theme });
  };

  const updateLanguage = (language) => {
    dispatch({ type: ACTIONS.SET_LANGUAGE, payload: language });
  };

  const updateNotifications = (notificationSettings) => {
    dispatch({ type: ACTIONS.UPDATE_NOTIFICATIONS, payload: notificationSettings });
  };

  const updateCalendar = (calendarSettings) => {
    dispatch({ type: ACTIONS.UPDATE_CALENDAR, payload: calendarSettings });
  };

  const updateTasks = (taskSettings) => {
    dispatch({ type: ACTIONS.UPDATE_TASKS, payload: taskSettings });
  };

  const updateDashboard = (dashboardSettings) => {
    dispatch({ type: ACTIONS.UPDATE_DASHBOARD, payload: dashboardSettings });
  };

  const updatePrivacy = (privacySettings) => {
    dispatch({ type: ACTIONS.UPDATE_PRIVACY, payload: privacySettings });
  };

  const resetSettings = () => {
    dispatch({ type: ACTIONS.RESET_SETTINGS });
  };

  // Función para exportar configuraciones
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'agenda-escolar-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Función para importar configuraciones
  const importSettings = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          dispatch({ type: ACTIONS.LOAD_SETTINGS, payload: importedSettings });
          resolve(importedSettings);
        } catch (error) {
          reject(new Error('Archivo de configuración inválido'));
        }
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo'));
      reader.readAsText(file);
    });
  };

  const value = {
    settings,
    updateTheme,
    updateLanguage,
    updateNotifications,
    updateCalendar,
    updateTasks,
    updateDashboard,
    updatePrivacy,
    resetSettings,
    exportSettings,
    importSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
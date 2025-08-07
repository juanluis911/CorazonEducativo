// src/context/SettingsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext({});

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings debe ser usado dentro de SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'es',
    notifications: {
      email: true,
      push: true,
      taskReminders: true,
      announcements: true
    },
    calendar: {
      startDay: 1, // 0 = Domingo, 1 = Lunes
      view: 'month'
    }
  });

  // Cargar configuraciones desde localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('agenda-escolar-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  // Guardar configuraciones en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('agenda-escolar-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateNotificationSettings = (notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, ...notifications }
    }));
  };

  const updateCalendarSettings = (calendar) => {
    setSettings(prev => ({
      ...prev,
      calendar: { ...prev.calendar, ...calendar }
    }));
  };

  const resetSettings = () => {
    setSettings({
      theme: 'light',
      language: 'es',
      notifications: {
        email: true,
        push: true,
        taskReminders: true,
        announcements: true
      },
      calendar: {
        startDay: 1,
        view: 'month'
      }
    });
  };

  const value = {
    settings,
    updateSettings,
    updateNotificationSettings,
    updateCalendarSettings,
    resetSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
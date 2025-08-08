// src/pages/Settings.jsx
import React, { useState } from 'react';
import { Save } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'es',
    emailNotifications: true
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Aquí guardarías la configuración
    console.log('Guardando configuración:', settings);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Configuración
      </h1>

      <div className="card">
        <div className="card-body space-y-6">
          {/* Notificaciones */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Notificaciones
            </h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Recibir notificaciones push
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Recibir notificaciones por email
                </span>
              </label>
            </div>
          </div>

          {/* Apariencia */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Apariencia
            </h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleChange('darkMode', e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Modo oscuro
              </span>
            </label>
          </div>

          {/* Idioma */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Idioma
            </h3>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="form-select max-w-xs"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Botón guardar */}
          <div className="pt-4">
            <button 
              onClick={handleSave}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar cambios</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
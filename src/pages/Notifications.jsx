// src/pages/Notifications.jsx
import React from 'react';
import { Bell, Check, X } from 'lucide-react';

const Notifications = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Notificaciones
        </h1>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">
          Marcar todas como leídas
        </button>
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Nueva tarea asignada
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Se te ha asignado una nueva tarea de Matemáticas...
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Hace 5 minutos
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-green-600 hover:text-green-700 p-1">
                    <Check className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700 p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
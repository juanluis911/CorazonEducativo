
// src/components/Notifications/NotificationList.jsx
import React from 'react';
import { Bell, AlertCircle, Info } from 'lucide-react';

const NotificationList = () => {
  const notifications = [
    {
      id: 1,
      type: 'task_due',
      title: 'Tarea por vencer',
      message: 'El ensayo de Historia vence mañana',
      time: '2 horas',
      read: false
    },
    {
      id: 2,
      type: 'announcement',
      title: 'Nuevo anuncio',
      message: 'Reunión de padres programada',
      time: '1 día',
      read: true
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'task_due':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'announcement':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-3">
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay notificaciones</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border ${
              notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Hace {notification.time}
                </p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationList;
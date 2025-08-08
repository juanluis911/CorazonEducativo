// src/components/Notifications/NotificationList.jsx
import React from 'react';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const NotificationList = () => {
  // Datos de ejemplo
  const notifications = [
    {
      id: 1,
      type: 'task_due',
      title: 'Tarea próxima a vencer',
      message: 'El ensayo de Historia vence mañana',
      isRead: false,
      createdAt: '2024-08-07T10:00:00Z'
    },
    {
      id: 2,
      type: 'announcement',
      title: 'Nuevo anuncio',
      message: 'Suspensión de clases el viernes',
      isRead: true,
      createdAt: '2024-08-06T15:30:00Z'
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'task_due':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'announcement':
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-3">
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay notificaciones</p>
      ) : (
        notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              notification.isRead 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatTime(notification.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationList;
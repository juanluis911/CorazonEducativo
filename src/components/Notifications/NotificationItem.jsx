// src/components/Notifications/NotificationList.jsx
import React, { useState } from 'react';
import NotificationItem from './NotificationItem';
import { Bell, Check, X, Filter } from 'lucide-react';

const NotificationList = ({ isCompact = true }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'task_due',
      title: 'Tarea próxima a vencer',
      message: 'La tarea de Matemáticas vence mañana',
      isRead: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // hace 2 horas
      data: { taskId: 123 }
    },
    {
      id: 2,
      type: 'announcement',
      title: 'Nuevo anuncio',
      message: 'Cambio de horario para el examen de Historia',
      isRead: false,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // hace 5 horas
      data: { announcementId: 456 }
    },
    {
      id: 3,
      type: 'event_reminder',
      title: 'Recordatorio de evento',
      message: 'Reunión de padres en 30 minutos',
      isRead: true,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // hace 8 horas
      data: { eventId: 789 }
    },
    {
      id: 4,
      type: 'system',
      title: 'Actualización del sistema',
      message: 'Se han añadido nuevas funcionalidades',
      isRead: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // hace 1 día
      data: {}
    }
  ]);

  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'

  // Filtrar notificaciones
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead;
      case 'read':
        return notification.isRead;
      default:
        return true;
    }
  });

  // Marcar como leída
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Marcar todas como leídas
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  // Eliminar notificación
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Limpiar todas las notificaciones leídas
  const clearReadNotifications = () => {
    setNotifications(prev => prev.filter(notification => !notification.isRead));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (isCompact) {
    // Vista compacta para el dashboard
    return (
      <div className="space-y-3">
        {/* Header compacto */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell size={16} className="text-gray-600" />
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              Marcar todo leído
            </button>
          )}
        </div>

        {/* Lista compacta */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredNotifications.slice(0, 5).map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
              isCompact={true}
            />
          ))}
          
          {filteredNotifications.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <Bell size={24} className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No hay notificaciones</p>
            </div>
          )}
          
          {filteredNotifications.length > 5 && (
            <div className="text-center pt-2">
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                Ver todas ({filteredNotifications.length})
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vista completa para página dedicada
  return (
    <div className="space-y-4">
      {/* Header completo */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-900">Notificaciones</h2>
          {unreadCount > 0 && (
            <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
              {unreadCount} nuevas
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Filtros */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Todas</option>
            <option value="unread">No leídas</option>
            <option value="read">Leídas</option>
          </select>

          {/* Acciones */}
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800"
            >
              <Check size={14} />
              <span>Marcar todo leído</span>
            </button>
          )}

          <button
            onClick={clearReadNotifications}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
          >
            <X size={14} />
            <span>Limpiar leídas</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-900">{notifications.length}</p>
          <p className="text-sm text-blue-600">Total</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-yellow-900">{unreadCount}</p>
          <p className="text-sm text-yellow-600">No leídas</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-green-900">{notifications.length - unreadCount}</p>
          <p className="text-sm text-green-600">Leídas</p>
        </div>
      </div>

      {/* Lista de notificaciones */}
      <div className="space-y-2">
        {filteredNotifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={markAsRead}
            onDelete={deleteNotification}
            isCompact={false}
          />
        ))}
        
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Bell size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay notificaciones
            </h3>
            <p className="text-sm">
              {filter === 'unread' 
                ? 'No tienes notificaciones sin leer' 
                : filter === 'read'
                ? 'No tienes notificaciones leídas'
                : 'Aún no has recibido ninguna notificación'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
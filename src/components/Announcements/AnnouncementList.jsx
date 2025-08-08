// src/components/Announcements/AnnouncementList.jsx
import React from 'react';
import { Megaphone, Calendar, User } from 'lucide-react';

const AnnouncementList = () => {
  // Datos de ejemplo
  const announcements = [
    {
      id: 1,
      title: 'Suspensión de clases',
      content: 'Las clases del viernes 9 de agosto están suspendidas por día del estudiante.',
      author: 'Dirección Académica',
      priority: 'high',
      publishDate: '2024-08-06T09:00:00Z'
    },
    {
      id: 2,
      title: 'Entrega de calificaciones',
      content: 'Las calificaciones del primer bimestre estarán disponibles el lunes.',
      author: 'Coordinación',
      priority: 'medium',
      publishDate: '2024-08-05T14:00:00Z'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {announcements.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay anuncios</p>
      ) : (
        announcements.map(announcement => (
          <div
            key={announcement.id}
            className={`p-4 rounded-lg border ${getPriorityColor(announcement.priority)}`}
          >
            <div className="flex items-start space-x-3">
              <Megaphone className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {announcement.title}
                </h4>
                <p className="text-gray-700 text-sm mb-3">
                  {announcement.content}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{announcement.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(announcement.publishDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AnnouncementList;
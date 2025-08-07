
// src/components/Announcements/AnnouncementList.jsx
import React from 'react';
import { Megaphone, Calendar } from 'lucide-react';

const AnnouncementList = () => {
  const announcements = [
    {
      id: 1,
      title: 'Reunión de Padres',
      content: 'Se realizará una reunión de padres el próximo viernes a las 6 PM',
      author: 'Dirección',
      date: new Date('2024-12-15'),
      priority: 'high'
    },
    {
      id: 2,
      title: 'Vacaciones de Invierno',
      content: 'Las vacaciones de invierno comenzarán el 20 de diciembre',
      author: 'Administración',
      date: new Date('2024-12-10'),
      priority: 'medium'
    }
  ];

  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-gray-200 bg-gray-50'
  };

  return (
    <div className="space-y-4">
      {announcements.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay anuncios</p>
      ) : (
        announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`border rounded-lg p-4 ${priorityColors[announcement.priority]}`}
          >
            <div className="flex items-start space-x-3">
              <Megaphone className="w-5 h-5 text-indigo-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {announcement.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {announcement.content}
                </p>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>Por {announcement.author}</span>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {announcement.date.toLocaleDateString('es-ES')}
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
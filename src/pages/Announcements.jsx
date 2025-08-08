// src/pages/Announcements.jsx
import React from 'react';
import { Megaphone, Plus } from 'lucide-react';

const Announcements = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Anuncios
        </h1>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nuevo Anuncio</span>
        </button>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card">
            <div className="card-body">
              <div className="flex items-start space-x-3">
                <Megaphone className="w-6 h-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Anuncio {i}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Contenido del anuncio importante para todos los estudiantes...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Publicado hace 2 horas
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
// src/pages/Subjects.jsx
import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

const Subjects = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Materias
        </h1>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nueva Materia</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card">
            <div className="card-body">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Materia {i}
                  </h3>
                  <p className="text-sm text-gray-500">Descripción de la materia</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
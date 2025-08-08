// src/components/TaskList/TaskList.jsx
import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TaskList = () => {
  // Datos de ejemplo - en una app real vendrían de un hook o contexto
  const tasks = [
    {
      id: 1,
      title: "Ensayo de Historia",
      subject: "Historia",
      dueDate: "2024-08-10",
      priority: "high",
      completed: false
    },
    {
      id: 2,
      title: "Ejercicios de Matemáticas",
      subject: "Matemáticas",
      dueDate: "2024-08-08",
      priority: "medium",
      completed: true
    },
    {
      id: 3,
      title: "Lectura Capítulo 5",
      subject: "Literatura",
      dueDate: "2024-08-12",
      priority: "low",
      completed: false
    }
  ];

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay tareas pendientes</p>
      ) : (
        tasks.map(task => (
          <div
            key={task.id}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              task.completed 
                ? 'bg-gray-50 border-gray-200 opacity-75' 
                : 'bg-white border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="flex-shrink-0">
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                  )}
                </button>
                
                <div>
                  <h4 className={`font-medium ${
                    task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-500">{task.subject}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {getPriorityIcon(task.priority)}
                <span className="text-sm text-gray-500">
                  {formatDate(task.dueDate)}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
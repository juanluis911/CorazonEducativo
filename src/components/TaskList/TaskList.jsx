// src/components/TaskList/TaskList.jsx
import React from 'react';
import { CheckSquare, Square, Clock } from 'lucide-react';

const TaskList = () => {
  // Datos de ejemplo - en tu app real, esto vendrá de Firebase
  const tasks = [
    {
      id: 1,
      title: 'Entregar ensayo de Historia',
      subject: 'Historia',
      dueDate: new Date('2024-12-20'),
      completed: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Resolver ejercicios de Matemáticas',
      subject: 'Matemáticas',
      dueDate: new Date('2024-12-18'),
      completed: true,
      priority: 'medium'
    }
  ];

  const priorityColors = {
    low: 'border-l-green-500',
    medium: 'border-l-yellow-500',
    high: 'border-l-red-500'
  };

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tienes tareas pendientes</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`border-l-4 ${priorityColors[task.priority]} bg-gray-50 p-4 rounded-r-lg`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <button className="mt-1">
                  {task.completed ? (
                    <CheckSquare className="w-5 h-5 text-green-600" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <div>
                  <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-600">{task.subject}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {task.dueDate.toLocaleDateString('es-ES')}
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

export default TaskList;

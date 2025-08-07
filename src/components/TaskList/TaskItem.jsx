// src/components/TaskList/TaskItem.jsx
import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, AlertCircle, Check, Trash2, Edit3, MoreVertical } from 'lucide-react';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Normal';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-700 bg-red-100';
      case 'medium':
        return 'text-yellow-700 bg-yellow-100';
      case 'low':
        return 'text-green-700 bg-green-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const isOverdue = () => {
    return !task.completed && task.dueDate < new Date();
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const due = new Date(task.dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDueDate = () => {
    const daysUntil = getDaysUntilDue();
    
    if (daysUntil < 0) {
      return `Vencida hace ${Math.abs(daysUntil)} día(s)`;
    } else if (daysUntil === 0) {
      return 'Vence hoy';
    } else if (daysUntil === 1) {
      return 'Vence mañana';
    } else if (daysUntil <= 7) {
      return `Vence en ${daysUntil} día(s)`;
    } else {
      return task.dueDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  return (
    <div className={`
      border-l-4 bg-white rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md
      ${getPriorityColor(task.priority)}
      ${task.completed ? 'opacity-75' : ''}
      ${isOverdue() ? 'border-l-red-500 bg-red-50' : ''}
    `}>
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`
            flex-shrink-0 w-5 h-5 mt-1 border-2 rounded transition-colors
            ${task.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-400'
            }
          `}
        >
          {task.completed && <Check size={12} className="mx-auto" />}
        </button>

        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Título */}
              <h3 className={`
                text-sm font-medium mb-1
                ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}
              `}>
                {task.title}
              </h3>

              {/* Descripción */}
              {task.description && (
                <p className={`
                  text-sm mb-2
                  ${task.completed ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {task.description}
                </p>
              )}

              {/* Metadatos */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {/* Materia */}
                <div className="flex items-center space-x-1 text-indigo-600">
                  <BookOpen size={12} />
                  <span>{task.subject}</span>
                </div>

                {/* Fecha de vencimiento */}
                <div className={`
                  flex items-center space-x-1
                  ${isOverdue() ? 'text-red-600' : 'text-gray-500'}
                `}>
                  <Calendar size={12} />
                  <span>{formatDueDate()}</span>
                </div>

                {/* Prioridad */}
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${getPriorityBadgeColor(task.priority)}
                `}>
                  {getPriorityText(task.priority)}
                </span>

                {/* Indicador de vencimiento */}
                {isOverdue() && (
                  <div className="flex items-center space-x-1 text-red-600">
                    <AlertCircle size={12} />
                    <span className="font-medium">Vencida</span>
                  </div>
                )}
              </div>
            </div>

            {/* Menú de acciones */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
              >
                <MoreVertical size={16} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border z-10">
                  <button
                    onClick={() => {
                      // Implementar edición
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Edit3 size={14} className="mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      onDelete(task.id);
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} className="mr-2" />
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Barra de progreso para tareas en progreso */}
      {task.status === 'in_progress' && !task.completed && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>En progreso</span>
            <span>65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
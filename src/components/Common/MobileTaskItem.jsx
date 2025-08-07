// src/components/TaskList/MobileTaskItem.jsx
export const MobileTaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const priorityColors = {
    low: 'text-gray-500',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    urgent: 'text-red-600',
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <MobileCard className="task-item" pressable>
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className="mt-1 touch-target flex-shrink-0"
        >
          <div className={`
            w-5 h-5 rounded border-2 flex items-center justify-center
            ${task.completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 dark:border-gray-600'
            }
          `}>
            {task.completed && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>

        {/* Contenido de la tarea */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className={`
              text-sm font-medium 
              ${task.completed 
                ? 'line-through text-gray-500 dark:text-gray-400' 
                : 'text-gray-900 dark:text-white'
              }
            `}>
              {task.title}
            </h3>
            
            <div className="flex items-center space-x-1 ml-2">
              {/* Prioridad */}
              <span className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`}></span>
              
              {/* Acciones */}
              <button
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Editar tarea"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Descripción */}
          {task.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Metadatos */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {/* Materia */}
            {task.subject && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                {task.subject}
              </span>
            )}

            {/* Estado */}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
              {task.status === 'pending' && 'Pendiente'}
              {task.status === 'progress' && 'En progreso'}
              {task.status === 'completed' && 'Completada'}
              {task.status === 'cancelled' && 'Cancelada'}
            </span>

            {/* Fecha de vencimiento */}
            {task.dueDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                📅 {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </MobileCard>
  );
};
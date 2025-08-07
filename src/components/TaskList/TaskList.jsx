// src/components/TaskList/TaskList.jsx
import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { Plus, Filter, Search } from 'lucide-react';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Resolver ejercicios de álgebra',
      description: 'Capítulo 5, ejercicios del 1 al 20',
      subject: 'Matemáticas',
      dueDate: new Date(2025, 7, 15),
      priority: 'high',
      status: 'pending',
      completed: false
    },
    {
      id: 2,
      title: 'Ensayo sobre la Revolución Francesa',
      description: 'Mínimo 1000 palabras, incluir bibliografía',
      subject: 'Historia',
      dueDate: new Date(2025, 7, 20),
      priority: 'medium',
      status: 'in_progress',
      completed: false
    },
    {
      id: 3,
      title: 'Laboratorio de Química',
      description: 'Experimento sobre reacciones ácido-base',
      subject: 'Química',
      dueDate: new Date(2025, 7, 10),
      priority: 'high',
      status: 'completed',
      completed: true
    },
    {
      id: 4,
      title: 'Leer capítulos 3-5',
      description: 'El Quijote de la Mancha',
      subject: 'Literatura',
      dueDate: new Date(2025, 7, 25),
      priority: 'low',
      status: 'pending',
      completed: false
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (filter) {
      case 'pending':
        return !task.completed && matchesSearch;
      case 'completed':
        return task.completed && matchesSearch;
      case 'overdue':
        return !task.completed && task.dueDate < new Date() && matchesSearch;
      case 'today':
        const today = new Date();
        return task.dueDate.toDateString() === today.toDateString() && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  // Marcar tarea como completada
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, status: task.completed ? 'pending' : 'completed' }
        : task
    ));
  };

  // Eliminar tarea
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Obtener estadísticas
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    overdue: tasks.filter(t => !t.completed && t.dueDate < new Date()).length
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total</p>
          <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-sm text-yellow-600 font-medium">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Completadas</p>
          <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-sm text-red-600 font-medium">Vencidas</p>
          <p className="text-2xl font-bold text-red-900">{stats.overdue}</p>
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Barra de búsqueda */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Filtros y acciones */}
        <div className="flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
            <option value="overdue">Vencidas</option>
            <option value="today">Hoy</option>
          </select>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            <span>Nueva Tarea</span>
          </button>
        </div>
      </div>

      {/* Lista de tareas */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={toggleTaskCompletion}
              onDelete={deleteTask}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No se encontraron tareas</p>
            <p className="text-sm">
              {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando una nueva tarea'}
            </p>
          </div>
        )}
      </div>

      {/* Formulario de nueva tarea (modal simple) */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Nueva Tarea</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Título de la tarea"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                placeholder="Descripción (opcional)"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="">Seleccionar materia</option>
                <option value="Matemáticas">Matemáticas</option>
                <option value="Historia">Historia</option>
                <option value="Química">Química</option>
                <option value="Literatura">Literatura</option>
              </select>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="low">Prioridad Baja</option>
                <option value="medium">Prioridad Media</option>
                <option value="high">Prioridad Alta</option>
              </select>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Crear Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
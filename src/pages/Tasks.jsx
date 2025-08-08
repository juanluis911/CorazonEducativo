// src/pages/Tasks.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  BookOpen,
  X
} from 'lucide-react';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo
  useEffect(() => {
    const mockTasks = user?.role === 'teacher' ? [
      {
        id: 1,
        title: 'Ensayo sobre la Revolución Industrial',
        description: 'Escribir un ensayo de 500 palabras sobre los impactos de la Revolución Industrial',
        subject: 'Historia',
        dueDate: new Date('2025-08-15'),
        status: 'active',
        studentsAssigned: 25,
        submissionsReceived: 18,
        createdAt: new Date('2025-08-01')
      },
      {
        id: 2,
        title: 'Ejercicios de Álgebra - Capítulo 5',
        description: 'Resolver los ejercicios 1-20 del capítulo 5 del libro de matemáticas',
        subject: 'Matemáticas',
        dueDate: new Date('2025-08-12'),
        status: 'active',
        studentsAssigned: 30,
        submissionsReceived: 25,
        createdAt: new Date('2025-08-03')
      },
      {
        id: 3,
        title: 'Experimento de Física',
        description: 'Realizar el experimento de caída libre y entregar reporte',
        subject: 'Física',
        dueDate: new Date('2025-08-20'),
        status: 'draft',
        studentsAssigned: 0,
        submissionsReceived: 0,
        createdAt: new Date('2025-08-05')
      }
    ] : [
      {
        id: 1,
        title: 'Ensayo sobre la Revolución Industrial',
        description: 'Escribir un ensayo de 500 palabras sobre los impactos de la Revolución Industrial',
        subject: 'Historia',
        dueDate: new Date('2025-08-15'),
        status: 'pending',
        priority: 'high',
        submittedAt: null,
        grade: null
      },
      {
        id: 2,
        title: 'Ejercicios de Álgebra - Capítulo 5',
        description: 'Resolver los ejercicios 1-20 del capítulo 5 del libro de matemáticas',
        subject: 'Matemáticas',
        dueDate: new Date('2025-08-12'),
        status: 'completed',
        priority: 'medium',
        submittedAt: new Date('2025-08-10'),
        grade: 85
      },
      {
        id: 3,
        title: 'Lectura Comprensiva - Capítulo 3',
        description: 'Leer el capítulo 3 y responder las preguntas de comprensión',
        subject: 'Literatura',
        dueDate: new Date('2025-08-18'),
        status: 'pending',
        priority: 'low',
        submittedAt: null,
        grade: null
      }
    ];

    setTasks(mockTasks);
    setFilteredTasks(mockTasks);
    setLoading(false);
  }, [user?.role]);

  // Filtrar tareas
  useEffect(() => {
    let filtered = tasks;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por estado
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    // Filtro por materia
    if (filterSubject !== 'all') {
      filtered = filtered.filter(task => task.subject === filterSubject);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, filterStatus, filterSubject]);

  // Obtener materias únicas
  const subjects = [...new Set(tasks.map(task => task.subject))];

  // Marcar tarea como completada (solo estudiantes)
  const markAsCompleted = (taskId) => {
    if (user?.role !== 'student') return;
    
    setTasks(prev => prev.map(task =>
      task.id === taskId 
        ? { ...task, status: 'completed', submittedAt: new Date() }
        : task
    ));
  };

  // Estadísticas rápidas
  const stats = user?.role === 'teacher' ? {
    total: tasks.length,
    active: tasks.filter(t => t.status === 'active').length,
    drafts: tasks.filter(t => t.status === 'draft').length,
    totalSubmissions: tasks.reduce((sum, t) => sum + t.submissionsReceived, 0)
  } : {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    overdue: tasks.filter(t => t.status === 'pending' && new Date(t.dueDate) < new Date()).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.role === 'teacher' ? 'Gestión de Tareas' : 'Mis Tareas'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {user?.role === 'teacher' 
                    ? 'Administra las tareas de tus estudiantes'
                    : 'Mantén un seguimiento de tus tareas y entregas'
                  }
                </p>
              </div>
              
              {user?.role === 'teacher' && (
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Nueva Tarea
                </button>
              )}
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      {user?.role === 'teacher' ? 'Activas' : 'Completadas'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {user?.role === 'teacher' ? stats.active : stats.completed}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      {user?.role === 'teacher' ? 'Borradores' : 'Pendientes'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {user?.role === 'teacher' ? stats.drafts : stats.pending}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      {user?.role === 'teacher' ? 'Entregas' : 'Vencidas'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {user?.role === 'teacher' ? stats.totalSubmissions : stats.overdue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtros y búsqueda */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Buscar tareas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">Todos los estados</option>
                    {user?.role === 'teacher' ? (
                      <>
                        <option value="active">Activas</option>
                        <option value="draft">Borradores</option>
                      </>
                    ) : (
                      <>
                        <option value="pending">Pendientes</option>
                        <option value="completed">Completadas</option>
                      </>
                    )}
                  </select>
                  
                  <select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">Todas las materias</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Lista de tareas */}
            <div className="space-y-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    userRole={user?.role}
                    onMarkCompleted={markAsCompleted}
                  />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay tareas</h3>
                  <p className="text-gray-600">
                    {searchTerm || filterStatus !== 'all' || filterSubject !== 'all'
                      ? 'No se encontraron tareas con los filtros aplicados.'
                      : user?.role === 'teacher'
                      ? 'Aún no has creado ninguna tarea.'
                      : 'No tienes tareas asignadas por el momento.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal de crear tarea (solo para profesores) */}
      {showCreateModal && user?.role === 'teacher' && (
        <CreateTaskModal 
          onClose={() => setShowCreateModal(false)}
          onTaskCreated={(newTask) => {
            setTasks(prev => [...prev, newTask]);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
};

// Componente para cada tarea
const TaskCard = ({ task, userRole, onMarkCompleted }) => {
  const isOverdue = task.status === 'pending' && new Date(task.dueDate) < new Date();
  const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              task.status === 'completed' ? 'bg-green-100 text-green-800' :
              task.status === 'active' ? 'bg-blue-100 text-blue-800' :
              task.status === 'draft' ? 'bg-gray-100 text-gray-800' :
              isOverdue ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {task.status === 'completed' ? 'Completada' :
               task.status === 'active' ? 'Activa' :
               task.status === 'draft' ? 'Borrador' :
               isOverdue ? 'Vencida' : 'Pendiente'}
            </span>
          </div>
          
          <p className="text-gray-600 mb-3">{task.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              {task.subject}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(task.dueDate).toLocaleDateString('es-ES')}
              {userRole === 'student' && task.status === 'pending' && (
                <span className={`ml-2 ${isOverdue ? 'text-red-600' : daysUntilDue <= 2 ? 'text-orange-600' : ''}`}>
                  ({isOverdue ? 'Vencida' : `${daysUntilDue} días`})
                </span>
              )}
            </span>
            {userRole === 'teacher' && (
              <span>
                {task.submissionsReceived}/{task.studentsAssigned} entregas
              </span>
            )}
            {userRole === 'student' && task.grade && (
              <span className="text-green-600 font-medium">
                Calificación: {task.grade}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {userRole === 'student' && task.status === 'pending' && (
            <button
              onClick={() => onMarkCompleted(task.id)}
              className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
            >
              Marcar completada
            </button>
          )}
          {userRole === 'teacher' && (
            <>
              <button className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600">
                Ver entregas
              </button>
              <button className="bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600">
                Editar
              </button>
            </>
          )}
        </div>
      </div>
      
      {userRole === 'teacher' && task.status === 'active' && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progreso de entregas</span>
            <span>{Math.round((task.submissionsReceived / task.studentsAssigned) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(task.submissionsReceived / task.studentsAssigned) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal para crear nueva tarea (placeholder)
const CreateTaskModal = ({ onClose, onTaskCreated }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Nueva Tarea</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="text-center py-8">
          <p className="text-gray-600">Formulario de creación de tareas</p>
          <p className="text-sm text-gray-500 mt-2">
            Esta funcionalidad se implementará próximamente
          </p>
          
          <button 
            onClick={onClose}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
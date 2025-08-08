// src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  Bell
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentAnnouncements, setRecentAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo - en producción vendrían de Firebase
  useEffect(() => {
    // Simular carga de datos
    const mockTasks = [
      {
        id: 1,
        title: 'Ensayo de Historia',
        subject: 'Historia',
        dueDate: new Date('2025-08-10'),
        status: 'pending',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Ejercicios de Matemáticas',
        subject: 'Matemáticas',
        dueDate: new Date('2025-08-09'),
        status: 'completed',
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Lectura Capítulo 5',
        subject: 'Literatura',
        dueDate: new Date('2025-08-12'),
        status: 'pending',
        priority: 'low'
      }
    ];

    const mockEvents = [
      {
        id: 1,
        title: 'Examen de Matemáticas',
        date: new Date('2025-08-11'),
        type: 'exam'
      },
      {
        id: 2,
        title: 'Presentación Historia',
        date: new Date('2025-08-13'),
        type: 'presentation'
      }
    ];

    const mockAnnouncements = [
      {
        id: 1,
        title: 'Suspensión de clases',
        content: 'Las clases del viernes 9 de agosto están suspendidas.',
        date: new Date('2025-08-06'),
        author: 'Dirección Académica'
      },
      {
        id: 2,
        title: 'Entrega de calificaciones',
        content: 'Las calificaciones del primer bimestre estarán disponibles el lunes.',
        date: new Date('2025-08-05'),
        author: 'Coordinación'
      }
    ];

    setTasks(mockTasks);
    setUpcomingEvents(mockEvents);
    setRecentAnnouncements(mockAnnouncements);
    setLoading(false);
  }, []);

  // Estadísticas rápidas
  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    pendingTasks: tasks.filter(t => t.status === 'pending').length,
    overdueTasks: tasks.filter(t => 
      t.status === 'pending' && new Date(t.dueDate) < new Date()
    ).length
  };

  // Tareas urgentes (próximas 24 horas)
  const urgentTasks = tasks.filter(task => {
    if (task.status === 'completed') return false;
    const timeDiff = new Date(task.dueDate) - new Date();
    return timeDiff <= 24 * 60 * 60 * 1000 && timeDiff > 0;
  });

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
            {/* Bienvenida */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                ¡Bienvenido, {user?.firstName || 'Estudiante'}!
              </h1>
              <p className="text-gray-600 mt-2">
                Aquí tienes un resumen de tus actividades académicas
              </p>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Total Tareas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Completadas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Pendientes</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Atrasadas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.overdueTasks}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contenido principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tareas urgentes */}
                {urgentTasks.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center text-red-600">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Tareas Urgentes (Próximas 24h)
                    </h2>
                    
                    <div className="space-y-3">
                      {urgentTasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                          <div>
                            <h3 className="font-medium text-red-900">{task.title}</h3>
                            <p className="text-sm text-red-600">{task.subject}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-red-900">
                              {new Date(task.dueDate).toLocaleDateString('es-ES')}
                            </p>
                            <p className="text-xs text-red-600">
                              {new Date(task.dueDate).toLocaleTimeString('es-ES', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lista de tareas */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                    Mis Tareas
                  </h2>
                  
                  <div className="space-y-3">
                    {tasks.map(task => (
                      <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            task.status === 'completed' 
                              ? 'bg-green-500' 
                              : task.priority === 'high' 
                                ? 'bg-red-500' 
                                : task.priority === 'medium' 
                                  ? 'bg-yellow-500' 
                                  : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <h3 className={`font-medium ${
                              task.status === 'completed' 
                                ? 'text-gray-500 line-through' 
                                : 'text-gray-900'
                            }`}>
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-600">{task.subject}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(task.dueDate).toLocaleDateString('es-ES')}
                          </p>
                          <div className={`inline-block px-2 py-1 rounded-full text-xs ${
                            task.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : new Date(task.dueDate) < new Date() 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {task.status === 'completed' 
                              ? 'Completada' 
                              : new Date(task.dueDate) < new Date() 
                                ? 'Atrasada' 
                                : 'Pendiente'
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Próximos eventos */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
                    Próximos Eventos
                  </h2>
                  
                  <div className="space-y-3">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(event.date).toLocaleDateString('es-ES', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div>
                          <div className={`inline-block px-2 py-1 rounded-full text-xs ${
                            event.type === 'exam' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {event.type === 'exam' ? 'Examen' : 'Evento'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar derecho */}
              <div className="space-y-6">
                {/* Anuncios recientes */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Bell className="h-5 w-5 text-purple-500 mr-2" />
                    Anuncios Recientes
                  </h2>
                  
                  <div className="space-y-4">
                    {recentAnnouncements.map(announcement => (
                      <div key={announcement.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                        <h3 className="font-medium text-gray-900 text-sm">{announcement.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{announcement.content}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-400">{announcement.author}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(announcement.date).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progreso general */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Mi Progreso</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Tareas Completadas</span>
                        <span>{Math.round((stats.completedTasks / stats.totalTasks) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(stats.completedTasks / stats.totalTasks) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
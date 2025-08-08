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
                ¡Bienvenido, {user?.firstName}!
              </h1>
              <p className="text-gray-600 mt-2">
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
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
                    <p className="text-sm font-medium text-gray-500">Vencidas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.overdueTasks}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tareas urgentes */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                    Tareas Urgentes
                  </h2>
                  
                  {urgentTasks.length > 0 ? (
                    <div className="space-y-3">
                      {urgentTasks.map(task => (
                        <div key={task.id} className="border-l-4 border-orange-400 bg-orange-50 p-4 rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900">{task.title}</h3>
                              <p className="text-sm text-gray-600">{task.subject}</p>
                              <p className="text-xs text-orange-600 mt-1">
                                Vence: {new Date(task.dueDate).toLocaleDateString('es-ES')}
                              </p>
                            </div>
                            <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">
                              Ver detalles
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      ¡Excelente! No tienes tareas urgentes por el momento.
                    </p>
                  )}
                </div>

                {/* Próximos eventos */}
                <div className="bg-white rounded-lg shadow p-6 mt-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                    Próximos Eventos
                  </h2>
                  
                  <div className="space-y-3">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-600 capitalize">{event.type}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(event.date).toLocaleDateString('es-ES', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
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
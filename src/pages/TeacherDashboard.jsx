// src/pages/TeacherDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import { 
  Users, 
  FileText, 
  Megaphone, 
  Calendar,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  BookOpen
} from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo - en producción vendrían de Firebase
  useEffect(() => {
    const mockStudents = [
      { id: 1, name: 'Ana García', grade: '10A', tasksCompleted: 8, totalTasks: 10 },
      { id: 2, name: 'Luis Martín', grade: '10A', tasksCompleted: 7, totalTasks: 10 },
      { id: 3, name: 'María López', grade: '10B', tasksCompleted: 9, totalTasks: 10 },
      { id: 4, name: 'Carlos Ruiz', grade: '10B', tasksCompleted: 6, totalTasks: 10 }
    ];

    const mockTasks = [
      {
        id: 1,
        title: 'Ensayo sobre la Revolución',
        subject: 'Historia',
        dueDate: new Date('2025-08-15'),
        studentsAssigned: 25,
        submissionsReceived: 18,
        status: 'active'
      },
      {
        id: 2,
        title: 'Ejercicios de Álgebra',
        subject: 'Matemáticas',
        dueDate: new Date('2025-08-12'),
        studentsAssigned: 30,
        submissionsReceived: 25,
        status: 'active'
      },
      {
        id: 3,
        title: 'Lectura Comprensiva',
        subject: 'Literatura',
        dueDate: new Date('2025-08-20'),
        studentsAssigned: 28,
        submissionsReceived: 5,
        status: 'active'
      }
    ];

    const mockAnnouncements = [
      {
        id: 1,
        title: 'Cambio de horario',
        content: 'La clase de matemáticas del viernes se ha movido a las 10:00 AM',
        publishDate: new Date('2025-08-06'),
        targetGrade: '10A'
      },
      {
        id: 2,
        title: 'Examen programado',
        content: 'El examen de historia será el próximo martes 13 de agosto',
        publishDate: new Date('2025-08-05'),
        targetGrade: '10B'
      }
    ];

    const mockSubmissions = [
      {
        id: 1,
        studentName: 'Ana García',
        taskTitle: 'Ensayo sobre la Revolución',
        submittedAt: new Date('2025-08-07'),
        status: 'pending'
      },
      {
        id: 2,
        studentName: 'Luis Martín',
        taskTitle: 'Ejercicios de Álgebra',
        submittedAt: new Date('2025-08-06'),
        status: 'graded',
        grade: 85
      }
    ];

    setStudents(mockStudents);
    setTasks(mockTasks);
    setAnnouncements(mockAnnouncements);
    setRecentSubmissions(mockSubmissions);
    setLoading(false);
  }, []);

  // Estadísticas rápidas
  const stats = {
    totalStudents: students.length,
    activeTasks: tasks.filter(t => t.status === 'active').length,
    pendingSubmissions: recentSubmissions.filter(s => s.status === 'pending').length,
    recentAnnouncements: announcements.length
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
            {/* Bienvenida */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Bienvenido, Profesor {user?.firstName}
              </h1>
              <p className="text-gray-600 mt-2">
                Panel de control docente - {new Date().toLocaleDateString('es-ES', { 
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
                  <Users className="h-8 w-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Estudiantes</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Tareas Activas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeTasks}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Por Revisar</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingSubmissions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Megaphone className="h-8 w-8 text-purple-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Anuncios</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.recentAnnouncements}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Plus className="h-5 w-5 mr-2" />
                  Nueva Tarea
                </button>
                <button className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <Megaphone className="h-5 w-5 mr-2" />
                  Nuevo Anuncio
                </button>
                <button className="flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                  <Calendar className="h-5 w-5 mr-2" />
                  Programar Evento
                </button>
                <button className="flex items-center justify-center p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Revisar Entregas
                </button>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tareas pendientes de revisión */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    Tareas Asignadas
                  </h2>
                  
                  <div className="space-y-4">
                    {tasks.map(task => {
                      const completionRate = (task.submissionsReceived / task.studentsAssigned) * 100;
                      
                      return (
                        <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{task.title}</h3>
                              <p className="text-sm text-gray-600">{task.subject}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Vence: {new Date(task.dueDate).toLocaleDateString('es-ES')}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                                Ver entregas
                              </button>
                              <button className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                                Editar
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{task.submissionsReceived}/{task.studentsAssigned} entregas</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                completionRate >= 80 
                                  ? 'bg-green-100 text-green-800'
                                  : completionRate >= 50
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {Math.round(completionRate)}% completado
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  completionRate >= 80 ? 'bg-green-500' :
                                  completionRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${completionRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Entregas recientes */}
                <div className="bg-white rounded-lg shadow p-6 mt-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Clock className="h-5 w-5 text-orange-500 mr-2" />
                    Entregas Recientes
                  </h2>
                  
                  <div className="space-y-3">
                    {recentSubmissions.map(submission => (
                      <div key={submission.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{submission.studentName}</h3>
                          <p className="text-sm text-gray-600">{submission.taskTitle}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(submission.submittedAt).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {submission.status === 'graded' ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                              Calificado: {submission.grade}
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                              Pendiente
                            </span>
                          )}
                          <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                            Revisar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar derecho */}
              <div className="space-y-6">
                {/* Mis estudiantes */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Users className="h-5 w-5 text-green-500 mr-2" />
                    Mis Estudiantes
                  </h2>
                  
                  <div className="space-y-3">
                    {students.map(student => {
                      const progressPercent = (student.tasksCompleted / student.totalTasks) * 100;
                      
                      return (
                        <div key={student.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 text-sm">{student.name}</h3>
                              <p className="text-xs text-gray-600">{student.grade}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {student.tasksCompleted}/{student.totalTasks} tareas
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                progressPercent >= 80 
                                  ? 'bg-green-100 text-green-800'
                                  : progressPercent >= 60
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {Math.round(progressPercent)}%
                              </span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div 
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  progressPercent >= 80 ? 'bg-green-500' :
                                  progressPercent >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${progressPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-800">
                    Ver todos los estudiantes →
                  </button>
                </div>

                {/* Anuncios recientes */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Megaphone className="h-5 w-5 text-purple-500 mr-2" />
                    Mis Anuncios
                  </h2>
                  
                  <div className="space-y-4">
                    {announcements.map(announcement => (
                      <div key={announcement.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                        <h3 className="font-medium text-gray-900 text-sm">{announcement.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{announcement.content}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-400">{announcement.targetGrade}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(announcement.publishDate).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-4 text-purple-600 text-sm font-medium hover:text-purple-800">
                    Gestionar anuncios →
                  </button>
                </div>

                {/* Calendario rápido */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
                    Esta Semana
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <div>
                        <p className="text-sm font-medium text-blue-900">Clase 10A</p>
                        <p className="text-xs text-blue-600">Matemáticas</p>
                      </div>
                      <span className="text-xs text-blue-600">09:00</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <div>
                        <p className="text-sm font-medium text-green-900">Clase 10B</p>
                        <p className="text-xs text-green-600">Historia</p>
                      </div>
                      <span className="text-xs text-green-600">11:00</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <div>
                        <p className="text-sm font-medium text-red-900">Examen</p>
                        <p className="text-xs text-red-600">Historia - 10B</p>
                      </div>
                      <span className="text-xs text-red-600">Mañana</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-800">
                    Ver calendario completo →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
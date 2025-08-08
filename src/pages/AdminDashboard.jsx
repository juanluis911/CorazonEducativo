// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import { 
  Users, 
  BookOpen, 
  Shield, 
  BarChart3,
  Settings,
  UserPlus,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Bell,
  FileText
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo - en producción vendrían de Firebase
  useEffect(() => {
    const mockStats = {
      totalUsers: 1247,
      totalStudents: 980,
      totalTeachers: 45,
      totalAdmins: 8,
      activeTasks: 156,
      completedTasks: 892,
      totalAnnouncements: 23,
      systemUptime: 99.8
    };

    const mockActivity = [
      {
        id: 1,
        type: 'user_registered',
        description: 'Nuevo estudiante registrado: María González',
        timestamp: new Date('2025-08-07T10:30:00'),
        severity: 'info'
      },
      {
        id: 2,
        type: 'task_created',
        description: 'Prof. Martínez creó nueva tarea: Ensayo de Historia',
        timestamp: new Date('2025-08-07T09:15:00'),
        severity: 'info'
      },
      {
        id: 3,
        type: 'system_alert',
        description: 'Alto uso de almacenamiento detectado (85%)',
        timestamp: new Date('2025-08-07T08:45:00'),
        severity: 'warning'
      },
      {
        id: 4,
        type: 'announcement_published',
        description: 'Nuevo anuncio publicado: Suspensión de clases',
        timestamp: new Date('2025-08-06T16:20:00'),
        severity: 'info'
      }
    ];

    const mockAlerts = [
      {
        id: 1,
        title: 'Uso de almacenamiento alto',
        description: 'El almacenamiento está al 85% de capacidad',
        severity: 'warning',
        timestamp: new Date('2025-08-07T08:45:00')
      },
      {
        id: 2,
        title: 'Backup programado',
        description: 'Backup automático completado exitosamente',
        severity: 'success',
        timestamp: new Date('2025-08-07T02:00:00')
      },
      {
        id: 3,
        title: 'Actualización disponible',
        description: 'Nueva versión del sistema disponible',
        severity: 'info',
        timestamp: new Date('2025-08-06T14:30:00')
      }
    ];

    setStats(mockStats);
    setRecentActivity(mockActivity);
    setSystemAlerts(mockAlerts);
    setLoading(false);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'success': return 'text-green-600 bg-green-100';
      case 'info':
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'success': return Shield;
      case 'info':
      default: return Bell;
    }
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
                Panel de Administración
              </h1>
              <p className="text-gray-600 mt-2">
                Bienvenido, {user?.firstName || 'Administrador'} - {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Estadísticas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Total Usuarios</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {stats.totalStudents} estudiantes, {stats.totalTeachers} profesores
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Tareas Activas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeTasks}</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {stats.completedTasks} completadas este mes
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Bell className="h-8 w-8 text-purple-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Anuncios</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalAnnouncements}</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Este mes
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-indigo-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Uptime Sistema</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.systemUptime}%</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-green-600">
                  Excelente rendimiento
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contenido principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Actividad reciente */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 text-indigo-500 mr-2" />
                    Actividad Reciente del Sistema
                  </h2>
                  
                  <div className="space-y-3">
                    {recentActivity.map(activity => {
                      const SeverityIcon = getSeverityIcon(activity.severity);
                      return (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                          <div className={`p-1 rounded-full ${getSeverityColor(activity.severity)}`}>
                            <SeverityIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(activity.timestamp).toLocaleString('es-ES')}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Distribución de usuarios */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    Distribución de Usuarios
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-700">Estudiantes</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">{stats.totalStudents}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(stats.totalStudents / stats.totalUsers) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {Math.round((stats.totalStudents / stats.totalUsers) * 100)}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-700">Profesores</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">{stats.totalTeachers}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(stats.totalTeachers / stats.totalUsers) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {Math.round((stats.totalTeachers / stats.totalUsers) * 100)}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-700">Administradores</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">{stats.totalAdmins}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${(stats.totalAdmins / stats.totalUsers) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {Math.round((stats.totalAdmins / stats.totalUsers) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar derecho */}
              <div className="space-y-6">
                {/* Acciones rápidas */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
                  
                  <div className="space-y-2">
                    <button className="w-full bg-blue-500 text-white p-2 rounded-md text-sm hover:bg-blue-600 flex items-center justify-center">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Nuevo Usuario
                    </button>
                    <button className="w-full bg-green-500 text-white p-2 rounded-md text-sm hover:bg-green-600 flex items-center justify-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Anuncio Global
                    </button>
                    <button className="w-full bg-purple-500 text-white p-2 rounded-md text-sm hover:bg-purple-600 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Ver Reportes
                    </button>
                    <button className="w-full bg-gray-500 text-white p-2 rounded-md text-sm hover:bg-gray-600 flex items-center justify-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Configuración
                    </button>
                  </div>
                </div>

                {/* Alertas del sistema */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    Alertas del Sistema
                  </h2>
                  
                  <div className="space-y-3">
                    {systemAlerts.map(alert => {
                      const SeverityIcon = getSeverityIcon(alert.severity);
                      return (
                        <div key={alert.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <div className={`p-1 rounded-full ${getSeverityColor(alert.severity)} mt-0.5`}>
                              <SeverityIcon className="h-3 w-3" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                              <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(alert.timestamp).toLocaleString('es-ES')}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Estado del sistema */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    Estado del Sistema
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Base de Datos</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-green-600">Operativo</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Servidor Web</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-green-600">Operativo</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Almacenamiento</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm text-yellow-600">85% usado</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Backup</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-green-600">Actualizado</span>
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

export default AdminDashboard;
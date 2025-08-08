// src/pages/MobileDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Plus, 
  Calendar, 
  BookOpen, 
  CheckCircle, 
  Clock,
  AlertCircle,
  TrendingUp,
  X,
  Edit,
  Trash2,
  ChevronRight
} from 'lucide-react';
/*
import MobileLayout, { 
  MobileCard, 
  MobileButton, 
  MobileModal,
  MobileInput,
  SwipeableCard,
  BottomSheet
} from '../components/Common/MobileLayout';
*/
import { MobileTaskItem } from '../components/TaskList/MobileTaskItem';
import { MobileCalendar } from '../components/Calendar/MobileCalendar';
import { 
  useMobileDetection, 
  usePullToRefresh, 
  useHapticFeedback,
  useFormValidation 
} from '../hooks/useMobileDetection';
import { mobileUtils } from '../utils/mobileUtils';

const MobileDashboard = () => {
  const { isMobile } = useMobileDetection();
  const { lightImpact, success, error } = useHapticFeedback();
  
  // Estados principales
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCalendarSheet, setShowCalendarSheet] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  // Pull to refresh
  const { isPulling, pullDistance, pullToRefreshProps } = usePullToRefresh(
    async () => {
      setRefreshing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      await loadData();
      setRefreshing(false);
      success(); // Haptic feedback
    }
  );

  // Datos de ejemplo más completos
  const mockTasks = [
    {
      id: 1,
      title: 'Entregar proyecto de Matemáticas',
      description: 'Resolver ejercicios del capítulo 5 y 6 del libro de álgebra. Incluir gráficas y explicaciones detalladas.',
      subject: 'Matemáticas',
      priority: 'high',
      status: 'pending',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      completed: false,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: 'Estudiar para examen de Historia',
      description: 'Repasar temas de la Revolución Industrial y sus consecuencias sociales',
      subject: 'Historia',
      priority: 'medium',
      status: 'progress',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      completed: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      title: 'Leer capítulo 3 de Literatura',
      description: 'Analizar los personajes principales y sus motivaciones',
      subject: 'Literatura',
      priority: 'low',
      status: 'completed',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      completed: true,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 4,
      title: 'Laboratorio de Química',
      description: 'Práctica sobre reacciones ácido-base',
      subject: 'Química',
      priority: 'urgent',
      status: 'pending',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      completed: false,
      createdAt: new Date()
    },
    {
      id: 5,
      title: 'Ensayo de Inglés',
      description: 'Escribir ensayo de 500 palabras sobre cultura americana',
      subject: 'Inglés',
      priority: 'medium',
      status: 'progress',
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      completed: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];

  const mockEvents = [
    {
      id: 1,
      title: 'Examen de Matemáticas',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      time: '09:00',
      type: 'exam',
      subject: 'Matemáticas',
      location: 'Aula 201'
    },
    {
      id: 2,
      title: 'Presentación de Historia',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      time: '14:30',
      type: 'assignment',
      subject: 'Historia',
      location: 'Aula 105'
    },
    {
      id: 3,
      title: 'Entrega de proyecto',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: '23:59',
      type: 'deadline',
      subject: 'Matemáticas',
      location: 'Online'
    }
  ];

  const mockAnnouncements = [
    {
      id: 1,
      title: 'Cambio de horario',
      message: 'La clase de Educación Física del viernes se ha movido a las 10:00 AM',
      priority: 'medium',
      date: new Date(),
      read: false
    },
    {
      id: 2,
      title: 'Recordatorio',
      message: 'No olviden traer sus calculadoras para el examen de matemáticas',
      priority: 'high',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true
    }
  ];

  // Cargar datos
  const loadData = async () => {
    setLoading(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 800));
      setTasks(mockTasks);
      setEvents(mockEvents);
      setAnnouncements(mockAnnouncements);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Limpiar localStorage antiguo
    mobileUtils.cleanOldStorage();
  }, []);

  // Handlers de tareas
  const handleTaskToggle = (taskId) => {
    lightImpact();
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            completed: !task.completed, 
            status: task.completed ? 'pending' : 'completed' 
          }
        : task
    ));
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleTaskDelete = (taskId) => {
    lightImpact();
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleTaskSave = (taskData) => {
    if (editingTask) {
      // Actualizar tarea existente
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? { ...task, ...taskData } : task
      ));
    } else {
      // Crear nueva tarea
      const newTask = {
        ...taskData,
        id: Date.now(),
        status: 'pending',
        completed: false,
        createdAt: new Date()
      };
      setTasks(prev => [newTask, ...prev]);
    }
    
    setShowTaskModal(false);
    setEditingTask(null);
    success();
  };

  // Handlers del calendario
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendarSheet(false);
  };

  // Handlers de anuncios
  const markAnnouncementAsRead = (announcementId) => {
    setAnnouncements(prev => prev.map(announcement =>
      announcement.id === announcementId 
        ? { ...announcement, read: true }
        : announcement
    ));
  };

  // Estadísticas calculadas
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && new Date(t.dueDate) < new Date()).length,
    today: tasks.filter(t => {
      const today = new Date();
      const taskDate = new Date(t.dueDate);
      return !t.completed && 
             taskDate.toDateString() === today.toDateString();
    }).length
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  // Tareas urgentes (próximas 24 horas)
  const urgentTasks = tasks.filter(task => {
    if (task.completed) return false;
    const timeDiff = new Date(task.dueDate) - new Date();
    return timeDiff <= 24 * 60 * 60 * 1000 && timeDiff > 0;
  });

  // Próximos eventos (próximos 7 días)
  const upcomingEvents = events.filter(event => {
    const timeDiff = new Date(event.date) - new Date();
    return timeDiff > 0 && timeDiff <= 7 * 24 * 60 * 60 * 1000;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  if (loading) {
    return (
      /*
      <MobileLayout title="Dashboard">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="spinner-lg mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Cargando datos...</p>
          </div>
        </div>
      </MobileLayout>
      */
    );
  }

  return (
    
    <MobileLayout title="Dashboard" showNotifications={true}>
      <div 
        className="space-y-6 pb-20"
        {...pullToRefreshProps}
      >
        {(isPulling || refreshing) && (
          <div 
            className="flex justify-center py-4 transition-all duration-200"
            style={{ transform: `translateY(${Math.min(pullDistance, 80)}px)` }}
          >
            <div className={`
              spinner-lg 
              ${refreshing ? 'animate-spin' : ''} 
              ${isPulling ? 'scale-100' : 'scale-0'}
              transition-transform duration-200
            `} />
          </div>
        )}

        {/* Saludo y fecha */}
        <MobileCard>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                ¡Hola, Estudiante! 👋
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {completionRate}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Completado
              </div>
            </div>
          </div>
        </MobileCard>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 gap-4">
          <MobileCard className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {stats.completed}
            </div>
            <div className="text-sm text-green-600 dark:text-green-300">
              Completadas
            </div>
          </MobileCard>

          <MobileCard className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
              {stats.pending}
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-300">
              Pendientes
            </div>
          </MobileCard>

          <MobileCard className="text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">
              {stats.overdue}
            </div>
            <div className="text-sm text-red-600 dark:text-red-300">
              Atrasadas
            </div>
          </MobileCard>

          <MobileCard className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {stats.today}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-300">
              Para hoy
            </div>
          </MobileCard>
        </div>

        {/* Acciones rápidas */}
        <MobileCard>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <MobileButton
              variant="primary"
              onClick={() => {
                setEditingTask(null);
                setShowTaskModal(true);
              }}
              className="flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nueva Tarea
            </MobileButton>
            
            <MobileButton
              variant="secondary"
              onClick={() => setShowCalendarSheet(true)}
              className="flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Ver Calendario
            </MobileButton>
          </div>
        </MobileCard>

        {/* Tareas urgentes */}
        {urgentTasks.length > 0 && (
          <MobileCard className="border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
                ⚠️ Tareas Urgentes
              </h3>
              <span className="text-sm text-red-600 dark:text-red-300">
                {urgentTasks.length} tarea{urgentTasks.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="space-y-3">
              {urgentTasks.slice(0, 2).map(task => (
                <SwipeableCard
                  key={task.id}
                  leftAction="❌ Eliminar"
                  rightAction="✅ Completar"
                  onSwipeLeft={() => handleTaskDelete(task.id)}
                  onSwipeRight={() => handleTaskToggle(task.id)}
                >
                  <MobileTaskItem
                    task={task}
                    onToggle={handleTaskToggle}
                    onEdit={handleTaskEdit}
                    onDelete={handleTaskDelete}
                    compact={true}
                  />
                </SwipeableCard>
              ))}
            </div>
          </MobileCard>
        )}

        {/* Lista de tareas recientes */}
        <MobileCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              📝 Tareas Recientes
            </h3>
            <MobileButton variant="ghost" size="sm">
              Ver todas
              <ChevronRight className="w-4 h-4 ml-1" />
            </MobileButton>
          </div>
          
          <div className="space-y-3">
            {tasks.slice(0, 4).map(task => (
              <SwipeableCard
                key={task.id}
                leftAction="🗑️ Eliminar"
                rightAction={task.completed ? "↩️ Deshacer" : "✅ Completar"}
                onSwipeLeft={() => handleTaskDelete(task.id)}
                onSwipeRight={() => handleTaskToggle(task.id)}
              >
                <MobileTaskItem
                  task={task}
                  onToggle={handleTaskToggle}
                  onEdit={handleTaskEdit}
                  onDelete={handleTaskDelete}
                />
              </SwipeableCard>
            ))}
          </div>
          
          {tasks.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay tareas
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Comienza agregando tu primera tarea
              </p>
              <MobileButton 
                variant="primary" 
                size="sm"
                onClick={() => setShowTaskModal(true)}
              >
                Crear Tarea
              </MobileButton>
            </div>
          )}
        </MobileCard>

        {/* Próximos eventos */}
        <MobileCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              📅 Próximos Eventos
            </h3>
            <MobileButton variant="ghost" size="sm">
              Ver más
              <ChevronRight className="w-4 h-4 ml-1" />
            </MobileButton>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex-shrink-0 mr-3">
                  <div className={`w-3 h-3 rounded-full ${
                    event.type === 'exam' ? 'bg-red-500' :
                    event.type === 'assignment' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {event.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {mobileUtils.formatDateMobile(event.date)}
                    </p>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {event.time}
                    </p>
                    {event.location && (
                      <>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {event.location}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <span className={`
                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                    ${event.type === 'exam' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : ''}
                    ${event.type === 'assignment' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : ''}
                    ${event.type === 'deadline' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' : ''}
                  `}>
                    {event.type === 'exam' ? '📝 Examen' : 
                     event.type === 'assignment' ? '📋 Tarea' : 
                     '⏰ Entrega'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {upcomingEvents.length === 0 && (
            <div className="text-center py-6">
              <Calendar className="w-10 h-10 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No hay eventos próximos
              </p>
            </div>
          )}
        </MobileCard>

        {/* Anuncios */}
        {announcements.length > 0 && (
          <MobileCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                📢 Anuncios
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {announcements.filter(a => !a.read).length} nuevos
              </span>
            </div>
            
            <div className="space-y-3">
              {announcements.slice(0, 3).map(announcement => (
                <div 
                  key={announcement.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    announcement.read 
                      ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                  }`}
                  onClick={() => markAnnouncementAsRead(announcement.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`text-sm font-medium ${
                          announcement.read 
                            ? 'text-gray-700 dark:text-gray-300' 
                            : 'text-blue-900 dark:text-blue-100'
                        }`}>
                          {announcement.title}
                        </h4>
                        {!announcement.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className={`text-xs mt-1 ${
                        announcement.read 
                          ? 'text-gray-500 dark:text-gray-400' 
                          : 'text-blue-700 dark:text-blue-300'
                      }`}>
                        {announcement.message}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        {mobileUtils.formatDateMobile(announcement.date)}
                      </p>
                    </div>
                    
                    <span className={`
                      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2
                      ${announcement.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : ''}
                      ${announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' : ''}
                      ${announcement.priority === 'low' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' : ''}
                    `}>
                      {announcement.priority === 'high' ? 'Alta' : 
                       announcement.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </MobileCard>
        )}
      </div>

      {/* Modal para crear/editar tarea */}
      <MobileModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        title={editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
        size="full"
      >
        <TaskForm 
          task={editingTask}
          onSave={handleTaskSave}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }} 
        />
      </MobileModal>

      {/* Bottom Sheet para calendario */}
      <BottomSheet
        isOpen={showCalendarSheet}
        onClose={() => setShowCalendarSheet(false)}
        title="📅 Calendario"
        snapPoints={['50%', '80%', '95%']}
        initialSnap={1}
      >
        <MobileCalendar
          events={events}
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />
      </BottomSheet>
    </MobileLayout>
  );
};

// Componente de formulario de tarea optimizado para móvil
const TaskForm = ({ task = null, onSave, onClose }) => {
  const { lightImpact } = useHapticFeedback();
  
  // Validaciones
  const validationRules = {
    title: [
      { required: true, message: 'El título es requerido' },
      { minLength: 3, message: 'El título debe tener al menos 3 caracteres' },
      { maxLength: 100, message: 'El título no puede exceder 100 caracteres' }
    ],
    subject: [
      { required: true, message: 'La materia es requerida' }
    ],
    dueDate: [
      { required: true, message: 'La fecha de vencimiento es requerida' },
      { 
        validate: (value) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const selectedDate = new Date(value);
          selectedDate.setHours(0, 0, 0, 0);
          
          if (selectedDate < today) {
            return 'La fecha no puede ser anterior a hoy';
          }
          return null;
        }
      }
    ]
  };

  const initialValues = {
    title: task?.title || '',
    description: task?.description || '',
    subject: task?.subject || '',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    dueTime: task?.dueDate ? new Date(task.dueDate).toTimeString().slice(0, 5) : '23:59'
  };

  const {
    values,
    errors,
    isValid,
    getFieldProps,
    validateForm
  } = useFormValidation(initialValues, validationRules);

  const subjects = [
    'Matemáticas',
    'Español',
    'Historia',
    'Ciencias',
    'Química',
    'Física',
    'Biología',
    'Inglés',
    'Arte',
    'Educación Física',
    'Tecnología',
    'Filosofía',
    'Otro'
  ];

  const priorities = [
    { value: 'low', label: 'Baja', color: 'text-gray-500', icon: '⬇️' },
    { value: 'medium', label: 'Media', color: 'text-yellow-600', icon: '➡️' },
    { value: 'high', label: 'Alta', color: 'text-orange-600', icon: '⬆️' },
    { value: 'urgent', label: 'Urgente', color: 'text-red-600', icon: '🚨' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      lightImpact();
      return;
    }

    // Combinar fecha y hora
    const dueDateTime = new Date(`${values.dueDate}T${values.dueTime}`);
    
    const taskData = {
      title: values.title.trim(),
      description: values.description.trim(),
      subject: values.subject,
      priority: values.priority,
      dueDate: dueDateTime
    };

    onSave(taskData);
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto momentum-scroll">
      <form onSubmit={handleSubmit} className="space-y-6 p-1">
        {/* Título */}
        <MobileInput
          label="Título"
          placeholder="Ej: Entregar proyecto de matemáticas"
          required
          maxLength={100}
          {...getFieldProps('title')}
        />

        {/* Descripción */}
        <div className="form-group">
          <label className="form-label">
            Descripción
          </label>
          <textarea
            className="form-input resize-none"
            rows={3}
            placeholder="Detalles adicionales sobre la tarea..."
            maxLength={500}
            {...getFieldProps('description')}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
            {values.description.length}/500
          </div>
        </div>

        {/* Materia */}
        <div className="form-group">
          <label className="form-label">
            Materia
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            className={`form-input ${errors.subject ? 'input-error' : ''}`}
            {...getFieldProps('subject')}
          >
            <option value="">Seleccionar materia</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="error-text">{errors.subject}</p>
          )}
        </div>

        {/* Prioridad */}
        <div className="form-group">
          <label className="form-label">
            Prioridad
          </label>
          <div className="grid grid-cols-2 gap-2">
            {priorities.map(priority => (
              <button
                key={priority.value}
                type="button"
                onClick={() => getFieldProps('priority').onChange({ target: { value: priority.value } })}
                className={`
                  p-3 border rounded-lg text-sm font-medium transition-all duration-200
                  ${values.priority === priority.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 scale-105'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }
                `}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">{priority.icon}</span>
                  <span>{priority.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Fecha y hora */}
        <div className="grid grid-cols-2 gap-4">
          <MobileInput
            label="Fecha límite"
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            {...getFieldProps('dueDate')}
          />

          <div className="form-group">
            <label className="form-label">
              Hora
            </label>
            <input
              type="time"
              className="form-input"
              {...getFieldProps('dueTime')}
            />
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-blue-500 text-lg">💡</div>
            <div>
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                Consejos para una buena tarea
              </h4>
              <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Sé específico en el título</li>
                <li>• Incluye detalles importantes en la descripción</li>
                <li>• Establece una fecha límite realista</li>
                <li>• Asigna la prioridad correcta</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-4 space-y-3">
          <MobileButton
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!isValid}
          >
            {task ? '✅ Actualizar Tarea' : '➕ Crear Tarea'}
          </MobileButton>
          
          <MobileButton
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            onClick={onClose}
          >
            ❌ Cancelar
          </MobileButton>
        </div>
      </form>
    </div>
  );
};

// Componente MobileTaskItem mejorado
export const MobileTaskItem = ({ 
  task, 
  onToggle, 
  onEdit, 
  onDelete, 
  compact = false 
}) => {
  const priorityColors = {
    low: 'text-gray-500',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    urgent: 'text-red-600',
  };

  const priorityBgColors = {
    low: 'bg-gray-100 dark:bg-gray-700',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30',
    high: 'bg-orange-100 dark:bg-orange-900/30',
    urgent: 'bg-red-100 dark:bg-red-900/30',
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };

  const isOverdue = !task.completed && new Date(task.dueDate) < new Date();
  const daysLeft = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700
      ${compact ? 'p-3' : 'p-4'} transition-all duration-200
      hover:shadow-md active:scale-[0.98]
      ${isOverdue ? 'border-red-300 dark:border-red-600' : ''}
      ${task.completed ? 'opacity-75' : ''}
    `}>
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className="mt-1 touch-target flex-shrink-0 transition-transform active:scale-90"
        >
          <div className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
            ${task.completed 
              ? 'bg-green-500 border-green-500 scale-110' 
              : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
            }
          `}>
            {task.completed && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>

        {/* Contenido de la tarea */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`
              ${compact ? 'text-sm' : 'text-base'} font-medium leading-tight
              ${task.completed 
                ? 'line-through text-gray-500 dark:text-gray-400' 
                : 'text-gray-900 dark:text-white'
              }
            `}>
              {task.title}
            </h3>
            
            {!compact && (
              <div className="flex items-center space-x-1 ml-2">
                <button
                  onClick={() => onEdit(task)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors touch-target"
                  aria-label="Editar tarea"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors touch-target"
                  aria-label="Eliminar tarea"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Descripción */}
          {!compact && task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Metadatos */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Materia */}
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              📚 {task.subject}
            </span>

            {/* Prioridad */}
            <span className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${priorityBgColors[task.priority]} ${priorityColors[task.priority]}
            `}>
              {task.priority === 'urgent' ? '🚨' : 
               task.priority === 'high' ? '⬆️' : 
               task.priority === 'medium' ? '➡️' : '⬇️'} 
              {task.priority === 'low' ? 'Baja' :
               task.priority === 'medium' ? 'Media' :
               task.priority === 'high' ? 'Alta' : 'Urgente'}
            </span>

            {/* Estado */}
            {!compact && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                {task.status === 'pending' && '⏳ Pendiente'}
                {task.status === 'progress' && '🔄 En progreso'}
                {task.status === 'completed' && '✅ Completada'}
                {task.status === 'cancelled' && '❌ Cancelada'}
              </span>
            )}
          </div>

          {/* Fecha de vencimiento */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <span className={`
                text-xs font-medium
                ${isOverdue ? 'text-red-600 dark:text-red-400' : 
                  daysLeft <= 1 ? 'text-orange-600 dark:text-orange-400' :
                  'text-gray-500 dark:text-gray-400'
                }
              `}>
                📅 {mobileUtils.formatDateMobile(task.dueDate)}
              </span>
              
              {isOverdue && (
                <span className="text-xs font-bold text-red-600 dark:text-red-400">
                  ⚠️ ATRASADA
                </span>
              )}
              
              {!task.completed && !isOverdue && daysLeft <= 3 && (
                <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                  ⏰ {daysLeft === 0 ? 'Hoy' : `${daysLeft} día${daysLeft !== 1 ? 's' : ''}`}
                </span>
              )}
            </div>

            {/* Tiempo transcurrido desde creación */}
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Creada {mobileUtils.formatDateMobile(task.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;
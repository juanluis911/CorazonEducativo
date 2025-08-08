// src/pages/Calendar.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  X,
  Edit,
  Trash2
} from 'lucide-react';

const Calendar = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'

  // Datos de ejemplo
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: 'Examen de Matemáticas',
        description: 'Examen del segundo bimestre - Capítulos 4-6',
        date: new Date('2025-08-11'),
        startTime: '09:00',
        endTime: '11:00',
        type: 'exam',
        location: 'Aula 101',
        subject: 'Matemáticas',
        createdBy: user?.role === 'teacher' ? 'current_user' : 'Profesor García',
        attendees: user?.role === 'teacher' ? ['student1', 'student2'] : null
      },
      {
        id: 2,
        title: 'Presentación de Historia',
        description: 'Presentaciones grupales sobre la Segunda Guerra Mundial',
        date: new Date('2025-08-13'),
        startTime: '14:00',
        endTime: '16:00',
        type: 'presentation',
        location: 'Aula 205',
        subject: 'Historia',
        createdBy: user?.role === 'teacher' ? 'current_user' : 'Profesora Martín',
        attendees: user?.role === 'teacher' ? ['student1', 'student2', 'student3'] : null
      },
      {
        id: 3,
        title: 'Reunión de Padres',
        description: 'Reunión trimestral con padres de familia',
        date: new Date('2025-08-15'),
        startTime: '18:00',
        endTime: '20:00',
        type: 'meeting',
        location: 'Auditorio Principal',
        subject: 'General',
        createdBy: 'Dirección',
        attendees: null
      },
      {
        id: 4,
        title: 'Entrega de Proyectos',
        description: 'Fecha límite para entrega de proyectos de ciencias',
        date: new Date('2025-08-09'),
        startTime: '23:59',
        endTime: '23:59',
        type: 'deadline',
        location: 'Virtual',
        subject: 'Ciencias',
        createdBy: user?.role === 'teacher' ? 'current_user' : 'Profesor López',
        attendees: null
      },
      {
        id: 5,
        title: 'Día de la Independencia',
        description: 'Celebración del Día de la Independencia - No hay clases',
        date: new Date('2025-08-16'),
        startTime: '00:00',
        endTime: '23:59',
        type: 'holiday',
        location: 'Todo el colegio',
        subject: 'General',
        createdBy: 'Administración',
        attendees: null
      }
    ];

    setEvents(mockEvents);
  }, [user?.role]);

  // Obtener días del mes actual
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    
    for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
      days.push(new Date(day));
    }
    
    return days;
  };

  // Obtener eventos de un día específico
  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  // Navegar entre meses
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Tipos de eventos con colores
  const eventTypeStyles = {
    exam: 'bg-red-100 text-red-800 border-red-200',
    presentation: 'bg-blue-100 text-blue-800 border-blue-200',
    meeting: 'bg-purple-100 text-purple-800 border-purple-200',
    deadline: 'bg-orange-100 text-orange-800 border-orange-200',
    holiday: 'bg-green-100 text-green-800 border-green-200',
    class: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header del calendario */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Calendario</h1>
                <p className="text-gray-600 mt-2">
                  {user?.role === 'teacher' 
                    ? 'Gestiona eventos y horarios de tus clases'
                    : 'Ve tus próximos eventos y fechas importantes'
                  }
                </p>
              </div>
              
              {user?.role === 'teacher' && (
                <button 
                  onClick={() => setShowEventModal(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Nuevo Evento
                </button>
              )}
            </div>

            {/* Controles de navegación */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <h2 className="text-xl font-semibold">
                    {currentDate.toLocaleDateString('es-ES', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </h2>
                  
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Hoy
                  </button>
                  
                  <div className="flex bg-gray-100 rounded-lg">
                    {['month', 'week', 'day'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-3 py-2 text-sm rounded-lg ${
                          viewMode === mode 
                            ? 'bg-indigo-600 text-white' 
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {mode === 'month' ? 'Mes' : mode === 'week' ? 'Semana' : 'Día'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Vista de calendario */}
            {viewMode === 'month' && (
              <div className="bg-white rounded-lg shadow">
                {/* Cabecera de días de la semana */}
                <div className="grid grid-cols-7 border-b">
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                    <div key={day} className="p-4 text-center font-medium text-gray-500 bg-gray-50">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7">
                  {days.map((day, index) => {
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                    const isToday = day.toDateString() === today.toDateString();
                    const dayEvents = getEventsForDate(day);
                    
                    return (
                      <div
                        key={index}
                        className={`min-h-32 p-2 border-b border-r border-gray-200 ${
                          !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                        } ${isToday ? 'bg-blue-50' : ''} hover:bg-gray-50 cursor-pointer`}
                        onClick={() => setSelectedDate(day)}
                      >
                        <div className={`text-sm font-medium mb-2 ${
                          isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''
                        }`}>
                          {day.getDate()}
                        </div>
                        
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map((event) => (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                              }}
                              className={`text-xs p-1 rounded border cursor-pointer hover:opacity-80 ${
                                eventTypeStyles[event.type] || 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              <div className="opacity-75">{event.startTime}</div>
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-gray-500 font-medium">
                              +{dayEvents.length - 3} más
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Resumen de eventos próximos */}
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Próximos Eventos</h3>
              <div className="space-y-3">
                {events
                  .filter(event => event.date >= today)
                  .sort((a, b) => a.date - b.date)
                  .slice(0, 5)
                  .map((event) => (
                    <div 
                      key={event.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          event.type === 'exam' ? 'bg-red-500' :
                          event.type === 'presentation' ? 'bg-blue-500' :
                          event.type === 'meeting' ? 'bg-purple-500' :
                          event.type === 'deadline' ? 'bg-orange-500' :
                          event.type === 'holiday' ? 'bg-green-500' : 'bg-indigo-500'
                        }`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600">
                            {event.date.toLocaleDateString('es-ES')} • {event.startTime}
                            {event.location && ` • ${event.location}`}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        eventTypeStyles[event.type] || 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.type === 'exam' ? 'Examen' :
                         event.type === 'presentation' ? 'Presentación' :
                         event.type === 'meeting' ? 'Reunión' :
                         event.type === 'deadline' ? 'Entrega' :
                         event.type === 'holiday' ? 'Feriado' : 'Evento'}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de detalles del evento */}
      {selectedEvent && (
        <EventDetailModal 
          event={selectedEvent}
          userRole={user?.role}
          onClose={() => setSelectedEvent(null)}
          onEdit={() => {
            setShowEventModal(true);
            setSelectedEvent(null);
          }}
          onDelete={(eventId) => {
            setEvents(prev => prev.filter(e => e.id !== eventId));
            setSelectedEvent(null);
          }}
        />
      )}

      {/* Modal de crear/editar evento */}
      {showEventModal && user?.role === 'teacher' && (
        <CreateEventModal 
          onClose={() => setShowEventModal(false)}
          onEventCreated={(newEvent) => {
            setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
            setShowEventModal(false);
          }}
        />
      )}
    </div>
  );
};

// Modal de detalles del evento
const EventDetailModal = ({ event, userRole, onClose, onEdit, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">{event.description}</p>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {event.date.toLocaleDateString('es-ES', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {event.startTime} - {event.endTime}
          </div>
          
          {event.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {event.location}
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            Creado por: {event.createdBy}
          </div>
          
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            event.type === 'exam' ? 'bg-red-100 text-red-800' :
            event.type === 'presentation' ? 'bg-blue-100 text-blue-800' :
            event.type === 'meeting' ? 'bg-purple-100 text-purple-800' :
            event.type === 'deadline' ? 'bg-orange-100 text-orange-800' :
            event.type === 'holiday' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {event.type === 'exam' ? 'Examen' :
             event.type === 'presentation' ? 'Presentación' :
             event.type === 'meeting' ? 'Reunión' :
             event.type === 'deadline' ? 'Fecha límite' :
             event.type === 'holiday' ? 'Feriado' : 'Evento'}
          </div>
        </div>
        
        {userRole === 'teacher' && event.createdBy === 'current_user' && (
          <div className="flex gap-2 mt-6">
            <button 
              onClick={onEdit}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </button>
            <button 
              onClick={() => onDelete(event.id)}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center justify-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Modal para crear evento (placeholder)
const CreateEventModal = ({ onClose, onEventCreated }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Nuevo Evento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="text-center py-8">
          <p className="text-gray-600">Formulario de creación de eventos</p>
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

export default Calendar;
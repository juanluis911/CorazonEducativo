// src/pages/Calendar.jsx - Con persistencia en Firebase
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import CreateEventForm from '../components/Calendar/CreateEventForm';
import { 
  getEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  canEditEvent,
  canDeleteEvent
} from '../services/eventService';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Users, 
  X,
  Edit,
  Trash2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

const Calendar = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Cargar eventos al montar el componente
  useEffect(() => {
    loadEvents();
  }, []);

  // Función para cargar eventos desde Firebase
  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error cargando eventos:', error);
      setError('No se pudieron cargar los eventos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Función para refrescar eventos
  const refreshEvents = async () => {
    try {
      setRefreshing(true);
      setError(null);
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error refrescando eventos:', error);
      setError('No se pudieron actualizar los eventos.');
    } finally {
      setRefreshing(false);
    }
  };

  // Navigation functions
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Calendar utilities
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Event type styles
  const eventTypeStyles = {
    exam: 'bg-red-100 text-red-800',
    presentation: 'bg-blue-100 text-blue-800',
    meeting: 'bg-purple-100 text-purple-800',
    deadline: 'bg-orange-100 text-orange-800',
    holiday: 'bg-green-100 text-green-800',
    class: 'bg-indigo-100 text-indigo-800',
    assignment: 'bg-yellow-100 text-yellow-800'
  };

  // Get events for specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Manejar creación/edición de eventos
  const handleEventCreated = async (eventData) => {
    try {
      setError(null);
      
      if (editingEvent) {
        // Actualizar evento existente
        const updatedEvent = await updateEvent(editingEvent.id, eventData);
        setEvents(prev => prev.map(e => 
          e.id === editingEvent.id ? { ...updatedEvent, id: editingEvent.id } : e
        ));
        setEditingEvent(null);
      } else {
        // Crear nuevo evento
        const newEvent = await createEvent(eventData, user?.email);
        setEvents(prev => [...prev, newEvent]);
      }
      
      setShowEventModal(false);
    } catch (error) {
      console.error('Error guardando evento:', error);
      setError(error.message || 'Error al guardar el evento');
    }
  };

  // Iniciar edición de evento
  const handleEditEvent = (event) => {
    // Verificar permisos
    if (!canEditEvent(event, user?.email, user?.role)) {
      setError('No tienes permisos para editar este evento');
      return;
    }
    
    setEditingEvent(event);
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  // Eliminar evento
  const handleDeleteEvent = async (eventId) => {
    const eventToDelete = events.find(e => e.id === eventId);
    
    // Verificar permisos
    if (!canDeleteEvent(eventToDelete, user?.email, user?.role)) {
      setError('No tienes permisos para eliminar este evento');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        setError(null);
        await deleteEvent(eventId);
        setEvents(prev => prev.filter(e => e.id !== eventId));
        setSelectedEvent(null);
      } catch (error) {
        console.error('Error eliminando evento:', error);
        setError(error.message || 'Error al eliminar el evento');
      }
    }
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const days = [];

    // Empty days at the beginning
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 h-24"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = today.toDateString() === date.toDateString();
      const dayEvents = getEventsForDate(date);

      days.push(
        <div
          key={day}
          className={`p-2 h-24 border border-gray-200 ${
            date.getMonth() !== currentDate.getMonth() 
              ? 'bg-gray-50 text-gray-400' : 'bg-white'
          } ${isToday ? 'bg-blue-50' : ''} hover:bg-gray-50 cursor-pointer transition-colors`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-2 ${
            isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''
          }`}>
            {day}
          </div>
          
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                }}
                className={`text-xs p-1 rounded border cursor-pointer hover:opacity-80 transition-opacity ${
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
    }

    return days;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
                <p className="text-gray-600">Cargando calendario...</p>
              </div>
            </div>
          </main>
        </div>
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
            {/* Error Alert */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-700">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Header del calendario */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Calendario</h1>
                <p className="text-gray-600">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={refreshEvents}
                  disabled={refreshing}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
                  title="Actualizar eventos"
                >
                  <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                
                {user?.role === 'teacher' && (
                  <button
                    onClick={() => {
                      setEditingEvent(null);
                      setShowEventModal(true);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Evento
                  </button>
                )}
              </div>
            </div>

            {/* Vista del calendario */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Encabezados de días */}
              <div className="grid grid-cols-7 bg-gray-50">
                {dayNames.map((day) => (
                  <div key={day} className="p-4 text-center font-medium text-gray-700">
                    {day}
                  </div>
                ))}
              </div>

              {/* Días del calendario */}
              <div className="grid grid-cols-7">
                {renderCalendarDays()}
              </div>
            </div>

            {/* Resumen de eventos próximos */}
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Próximos Eventos</h3>
              <div className="space-y-3">
                {events
                  .filter(event => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .slice(0, 5)
                  .map((event) => (
                    <div 
                      key={event.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
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
                            {new Date(event.date).toLocaleDateString('es-ES')} • {event.startTime}
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
                         event.type === 'holiday' ? 'Feriado' :
                         event.type === 'assignment' ? 'Tarea' : 'Evento'}
                      </span>
                    </div>
                  ))}
                {events.filter(event => new Date(event.date) >= new Date()).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No hay eventos próximos</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de detalles del evento */}
      {selectedEvent && (
        <EventDetailModal 
          event={selectedEvent}
          user={user}
          onClose={() => setSelectedEvent(null)}
          onEdit={() => handleEditEvent(selectedEvent)}
          onDelete={handleDeleteEvent}
        />
      )}

      {/* Modal de crear/editar evento */}
      {showEventModal && user?.role === 'teacher' && (
        <CreateEventForm 
          existingEvent={editingEvent}
          onClose={() => {
            setShowEventModal(false);
            setEditingEvent(null);
          }}
          onEventCreated={handleEventCreated}
        />
      )}
    </div>
  );
};

// Modal de detalles del evento
const EventDetailModal = ({ event, user, onClose, onEdit, onDelete }) => {
  const canEdit = canEditEvent(event, user?.email, user?.role);
  const canDelete = canDeleteEvent(event, user?.email, user?.role);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          {event.description && (
            <div>
              <p className="text-gray-600">{event.description}</p>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {new Date(event.date).toLocaleDateString('es-ES', { 
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
          
          {event.subject && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              Materia: {event.subject}
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
            event.type === 'holiday' ? 'bg-green-100 text-green-800' :
            event.type === 'assignment' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {event.type === 'exam' ? 'Examen' :
             event.type === 'presentation' ? 'Presentación' :
             event.type === 'meeting' ? 'Reunión' :
             event.type === 'deadline' ? 'Fecha límite' :
             event.type === 'holiday' ? 'Feriado' :
             event.type === 'assignment' ? 'Tarea' : 'Evento'}
          </div>
        </div>
        
        {/* Botones de acción */}
        {(canEdit || canDelete) && (
          <div className="flex gap-2 mt-6">
            {canEdit && (
              <button 
                onClick={onEdit}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </button>
            )}
            {canDelete && (
              <button 
                onClick={() => onDelete(event.id)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center justify-center transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
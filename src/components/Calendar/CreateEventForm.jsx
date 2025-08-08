// src/components/Calendar/CreateEventForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  AlertCircle,
  Save,
  Type
} from 'lucide-react';

const CreateEventForm = ({ onClose, onEventCreated, existingEvent = null }) => {
  const { user } = useAuth();
  const isEditing = !!existingEvent;

  // Tipos de eventos disponibles - MOVIDO ANTES DEL ESTADO
  const eventTypes = [
    { value: 'exam', label: 'Examen', icon: '📝', color: '#EF4444' },
    { value: 'assignment', label: 'Entrega de Tarea', icon: '📋', color: '#F59E0B' },
    { value: 'class', label: 'Clase', icon: '📚', color: '#3B82F6' },
    { value: 'meeting', label: 'Reunión', icon: '👥', color: '#8B5CF6' },
    { value: 'holiday', label: 'Feriado', icon: '🎉', color: '#10B981' },
    { value: 'presentation', label: 'Presentación', icon: '🎤', color: '#06B6D4' },
    { value: 'deadline', label: 'Fecha Límite', icon: '⏰', color: '#F97316' }
  ];

  // Función para obtener color por defecto según el tipo
  function getDefaultColorForType(type) {
    const eventType = eventTypes.find(et => et.value === type);
    return eventType ? eventType.color : '#3B82F6';
  }

  // Estado del formulario - MOVIDO DESPUÉS DE LAS DECLARACIONES
  const [formData, setFormData] = useState({
    title: existingEvent?.title || '',
    description: existingEvent?.description || '',
    type: existingEvent?.type || 'class',
    date: existingEvent?.date ? existingEvent.date.toISOString().split('T')[0] : '',
    startTime: existingEvent?.startTime || '09:00',
    endTime: existingEvent?.endTime || '10:00',
    location: existingEvent?.location || '',
    subject: existingEvent?.subject || '',
    isPublic: existingEvent?.isPublic !== undefined ? existingEvent.isPublic : true,
    attendees: existingEvent?.attendees || [],
    color: existingEvent?.color || getDefaultColorForType(existingEvent?.type || 'class'),
    reminderMinutes: existingEvent?.reminderMinutes || 15
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Materias disponibles
  const subjects = [
    'Matemáticas', 'Ciencias', 'Historia', 'Literatura', 'Inglés',
    'Educación Física', 'Arte', 'Música', 'Geografía', 'Química',
    'Física', 'Biología', 'Informática', 'Filosofía'
  ];

  // Opciones de recordatorio
  const reminderOptions = [
    { value: 5, label: '5 minutos antes' },
    { value: 15, label: '15 minutos antes' },
    { value: 30, label: '30 minutos antes' },
    { value: 60, label: '1 hora antes' },
    { value: 1440, label: '1 día antes' },
    { value: 2880, label: '2 días antes' },
    { value: 10080, label: '1 semana antes' }
  ];

  // Función para obtener color por defecto según el tipo
  function getDefaultColorForType(type) {
    const eventType = eventTypes.find(et => et.value === type);
    return eventType ? eventType.color : '#3B82F6';
  }

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let newValue = type === 'checkbox' ? checked : value;
    
    // Si cambia el tipo de evento, actualizar el color por defecto
    if (name === 'type') {
      setFormData(prev => ({
        ...prev,
        [name]: newValue,
        color: getDefaultColorForType(newValue)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: newValue
      }));
    }

    // Limpiar error del campo modificado
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    // Título requerido
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (formData.title.length > 100) {
      newErrors.title = 'El título no puede exceder 100 caracteres';
    }

    // Fecha requerida
    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today && !isEditing) {
        newErrors.date = 'La fecha no puede ser anterior a hoy';
      }
    }

    // Validar horas
    if (!formData.startTime) {
      newErrors.startTime = 'La hora de inicio es requerida';
    }
    
    if (!formData.endTime) {
      newErrors.endTime = 'La hora de fin es requerida';
    }

    if (formData.startTime && formData.endTime) {
      const startTime = new Date(`2000-01-01T${formData.startTime}`);
      const endTime = new Date(`2000-01-01T${formData.endTime}`);
      
      if (endTime <= startTime) {
        newErrors.endTime = 'La hora de fin debe ser posterior a la hora de inicio';
      }
    }

    // Descripción opcional pero con límite
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'La descripción no puede exceder 500 caracteres';
    }

    // Ubicación opcional pero con límite
    if (formData.location && formData.location.length > 100) {
      newErrors.location = 'La ubicación no puede exceder 100 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Construir objeto del evento
      const eventData = {
        ...formData,
        date: new Date(formData.date),
        createdBy: user?.email || 'Usuario',
        createdAt: new Date(),
        updatedAt: new Date(),
        id: isEditing ? existingEvent.id : Date.now() + Math.random()
      };

      // Llamar función para crear/actualizar evento
      await onEventCreated(eventData);
      
      // Cerrar modal
      onClose();
      
    } catch (error) {
      console.error('Error al guardar evento:', error);
      setErrors({ submit: 'Error al guardar el evento. Intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Editar Evento' : 'Nuevo Evento'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Error general */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                <span className="text-red-700 text-sm">{errors.submit}</span>
              </div>
            )}

            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Type className="h-4 w-4 inline mr-2" />
                Título del Evento *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej: Examen de Matemáticas"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                maxLength={100}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.title.length}/100 caracteres
              </p>
            </div>

            {/* Tipo de Evento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Evento *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {eventTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`relative flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      formData.type === type.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-lg mr-2">{type.icon}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fecha y Horarios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Fecha *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Hora Inicio *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.startTime ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.startTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Hora Fin *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.endTime ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.endTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
                )}
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción opcional del evento..."
                rows={3}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                maxLength={500}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.description.length}/500 caracteres
              </p>
            </div>

            {/* Ubicación y Materia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Ubicación
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ej: Aula 205, Laboratorio..."
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  }`}
                  maxLength={100}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="h-4 w-4 inline mr-2" />
                  Materia
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Seleccionar materia</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Configuraciones adicionales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recordatorio
                </label>
                <select
                  name="reminderMinutes"
                  value={formData.reminderMinutes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {reminderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color del Evento
                </label>
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Configuración de visibilidad */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Evento Público
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Los eventos públicos son visibles para todos los usuarios
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? 'Actualizar Evento' : 'Crear Evento'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
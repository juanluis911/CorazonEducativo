// src/components/Calendar/Calendar.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Datos de ejemplo - esto vendrá de Firebase
  const events = [
    {
      id: 1,
      title: 'Examen de Matemáticas',
      date: new Date(2025, 7, 15),
      type: 'exam',
      color: 'bg-red-500'
    },
    {
      id: 2,
      title: 'Entrega de Proyecto',
      date: new Date(2025, 7, 20),
      type: 'assignment',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Reunión de Padres',
      date: new Date(2025, 7, 25),
      type: 'meeting',
      color: 'bg-green-500'
    }
  ];

  // Obtener días del mes
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();

    const days = [];

    // Días del mes anterior
    for (let i = startDate - 1; i >= 0; i--) {
      const prevMonth = new Date(year, month - 1, 0);
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false
      });
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true
      });
    }

    // Días del siguiente mes
    const remaining = 42 - days.length;
    for (let day = 1; day <= remaining; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false
      });
    }

    return days;
  };

  // Obtener eventos para una fecha específica
  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  // Navegación del calendario
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const days = getDaysInMonth(currentDate);

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="bg-white rounded-lg">
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
          >
            Hoy
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
          <button className="ml-2 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Grid del calendario */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {/* Headers de días */}
        {dayNames.map(day => (
          <div key={day} className="bg-gray-50 py-2 text-center">
            <span className="text-sm font-medium text-gray-700">{day}</span>
          </div>
        ))}

        {/* Días del calendario */}
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day.date);
          return (
            <div
              key={index}
              onClick={() => setSelectedDate(day.date)}
              className={`
                bg-white min-h-[100px] p-2 cursor-pointer hover:bg-gray-50 transition-colors
                ${!day.isCurrentMonth ? 'text-gray-400 bg-gray-50' : ''}
                ${isSelected(day.date) ? 'ring-2 ring-indigo-500' : ''}
                ${isToday(day.date) ? 'bg-indigo-50' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`
                  text-sm font-medium
                  ${isToday(day.date) ? 'text-indigo-600' : ''}
                  ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                `}>
                  {day.date.getDate()}
                </span>
                {isToday(day.date) && (
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                )}
              </div>

              {/* Eventos del día */}
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    className={`
                      text-xs px-2 py-1 rounded text-white truncate
                      ${event.color}
                    `}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500 px-2">
                    +{dayEvents.length - 2} más
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Eventos del día seleccionado */}
      {selectedDate && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">
            Eventos para {selectedDate.toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          
          {getEventsForDate(selectedDate).length > 0 ? (
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map(event => (
                <div key={event.id} className="flex items-center space-x-3 p-2 bg-white rounded">
                  <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                  <span className="text-sm text-gray-900">{event.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No hay eventos programados</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
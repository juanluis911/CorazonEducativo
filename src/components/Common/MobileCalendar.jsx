// src/components/Calendar/MobileCalendar.jsx
export const MobileCalendar = ({ events = [], onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day'

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Días del mes anterior
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevMonthDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), -i);
      days.push(
        <div key={`prev-${i}`} className="calendar-day other-month">
          <span className="calendar-day-number">{prevMonthDay.getDate()}</span>
        </div>
      );
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const dayEvents = events.filter(event => 
        new Date(event.date).toDateString() === date.toDateString()
      );

      days.push(
        <div 
          key={day} 
          className={`
            calendar-day cursor-pointer
            ${isToday ? 'today' : ''}
            ${isSelected ? 'bg-blue-200 dark:bg-blue-800' : ''}
          `}
          onClick={() => onDateSelect(date)}
        >
          <span className="calendar-day-number">{day}</span>
          {dayEvents.length > 0 && (
            <div className="calendar-events">
              {dayEvents.slice(0, 2).map((event, index) => (
                <div key={index} className="calendar-event">
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{dayEvents.length - 2} más
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <MobileCard className="calendar-container">
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="mobile-btn btn-ghost p-2"
          aria-label="Mes anterior"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>

        <button
          onClick={() => navigateMonth(1)}
          className="mobile-btn btn-ghost p-2"
          aria-label="Mes siguiente"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Selector de vista */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700">
          {['month', 'week', 'day'].map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              className={`
                px-3 py-1 text-sm font-medium first:rounded-l-lg last:rounded-r-lg
                ${view === viewType 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}
            >
              {viewType === 'month' && 'Mes'}
              {viewType === 'week' && 'Semana'}
              {viewType === 'day' && 'Día'}
            </button>
          ))}
        </div>
      </div>

      {/* Vista de mes */}
      {view === 'month' && (
        <>
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-px mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendario */}
          <div className="calendar-grid">
            {renderCalendarDays()}
          </div>
        </>
      )}
    </MobileCard>
  );
};
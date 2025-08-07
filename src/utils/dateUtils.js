// src/utils/dateUtils.js
import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday, addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay, isBefore, isAfter, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// Configurar el idioma por defecto
const locale = es;

/**
 * Formatea una fecha para mostrar
 * @param {Date|string} date - La fecha a formatear
 * @param {string} formatStr - El formato deseado
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale });
};

/**
 * Formatea una fecha y hora
 * @param {Date|string} date - La fecha a formatear
 * @returns {string} - Fecha y hora formateadas
 */
export const formatDateTime = (date) => {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
};

/**
 * Formatea solo la hora
 * @param {Date|string} date - La fecha a formatear
 * @returns {string} - Hora formateada
 */
export const formatTime = (date) => {
  return formatDate(date, 'HH:mm');
};

/**
 * Devuelve una descripción relativa de la fecha (ej: "hace 2 días")
 * @param {Date|string} date - La fecha
 * @returns {string} - Descripción relativa
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale });
};

/**
 * Obtiene una descripción amigable de la fecha
 * @param {Date|string} date - La fecha
 * @returns {string} - Descripción amigable
 */
export const getFriendlyDate = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) {
    return 'Hoy';
  } else if (isTomorrow(dateObj)) {
    return 'Mañana';
  } else if (isYesterday(dateObj)) {
    return 'Ayer';
  } else {
    return formatDate(dateObj, 'dd/MM/yyyy');
  }
};

/**
 * Obtiene una descripción completa amigable (fecha + hora)
 * @param {Date|string} date - La fecha
 * @returns {string} - Descripción completa
 */
export const getFriendlyDateTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const friendlyDate = getFriendlyDate(dateObj);
  const time = formatTime(dateObj);
  return `${friendlyDate} a las ${time}`;
};

/**
 * Verifica si una fecha es hoy
 * @param {Date|string} date - La fecha a verificar
 * @returns {boolean}
 */
export const isDateToday = (date) => {
  if (!date) return false;
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isToday(dateObj);
};

/**
 * Verifica si una fecha está vencida
 * @param {Date|string} date - La fecha a verificar
 * @returns {boolean}
 */
export const isOverdue = (date) => {
  if (!date) return false;
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  return isBefore(dateObj, now) && !isSameDay(dateObj, now);
};

/**
 * Calcula los días hasta una fecha
 * @param {Date|string} date - La fecha objetivo
 * @returns {number} - Número de días (negativo si ya pasó)
 */
export const getDaysUntil = (date) => {
  if (!date) return 0;
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  const diffTime = dateObj.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Obtiene el inicio de la semana
 * @param {Date} date - La fecha de referencia
 * @param {boolean} mondayFirst - Si la semana empieza en lunes
 * @returns {Date}
 */
export const getStartOfWeek = (date = new Date(), mondayFirst = true) => {
  return startOfWeek(date, { weekStartsOn: mondayFirst ? 1 : 0 });
};

/**
 * Obtiene el fin de la semana
 * @param {Date} date - La fecha de referencia
 * @param {boolean} mondayFirst - Si la semana empieza en lunes
 * @returns {Date}
 */
export const getEndOfWeek = (date = new Date(), mondayFirst = true) => {
  return endOfWeek(date, { weekStartsOn: mondayFirst ? 1 : 0 });
};

/**
 * Obtiene el inicio del mes
 * @param {Date} date - La fecha de referencia
 * @returns {Date}
 */
export const getStartOfMonth = (date = new Date()) => {
  return startOfMonth(date);
};

/**
 * Obtiene el fin del mes
 * @param {Date} date - La fecha de referencia
 * @returns {Date}
 */
export const getEndOfMonth = (date = new Date()) => {
  return endOfMonth(date);
};

/**
 * Crea una fecha para el input type="date"
 * @param {Date|string} date - La fecha
 * @returns {string} - Fecha en formato YYYY-MM-DD
 */
export const toInputDate = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};

/**
 * Crea una fecha para el input type="datetime-local"
 * @param {Date|string} date - La fecha
 * @returns {string} - Fecha en formato YYYY-MM-DDTHH:mm
 */
export const toInputDateTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, "yyyy-MM-dd'T'HH:mm");
};

/**
 * Obtiene un rango de fechas
 * @param {Date} startDate - Fecha de inicio
 * @param {Date} endDate - Fecha de fin
 * @returns {Date[]} - Array de fechas
 */
export const getDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  
  return dates;
};

/**
 * Obtiene el nombre del día de la semana
 * @param {Date|string} date - La fecha
 * @returns {string} - Nombre del día
 */
export const getDayName = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'EEEE', { locale });
};

/**
 * Obtiene el nombre del mes
 * @param {Date|string} date - La fecha
 * @returns {string} - Nombre del mes
 */
export const getMonthName = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMMM', { locale });
};

/**
 * Verifica si una fecha está en un rango
 * @param {Date|string} date - La fecha a verificar
 * @param {Date|string} startDate - Fecha de inicio del rango
 * @param {Date|string} endDate - Fecha de fin del rango
 * @returns {boolean}
 */
export const isDateInRange = (date, startDate, endDate) => {
  if (!date || !startDate || !endDate) return false;
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const startObj = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const endObj = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  return (isAfter(dateObj, startObj) || isSameDay(dateObj, startObj)) &&
         (isBefore(dateObj, endObj) || isSameDay(dateObj, endObj));
};

/**
 * Calcula la edad basada en la fecha de nacimiento
 * @param {Date|string} birthDate - Fecha de nacimiento
 * @returns {number} - Edad en años
 */
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  const birthObj = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
  const today = new Date();
  let age = today.getFullYear() - birthObj.getFullYear();
  const monthDiff = today.getMonth() - birthObj.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthObj.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Obtiene las fechas de los próximos N días
 * @param {number} days - Número de días
 * @param {Date} startDate - Fecha de inicio (por defecto hoy)
 * @returns {Date[]} - Array de fechas
 */
export const getNextDays = (days, startDate = new Date()) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    dates.push(addDays(startDate, i));
  }
  return dates;
};

/**
 * Convierte una fecha ISO string a Date object
 * @param {string} isoString - String en formato ISO
 * @returns {Date|null} - Objeto Date o null si es inválido
 */
export const parseISOString = (isoString) => {
  try {
    return parseISO(isoString);
  } catch (error) {
    console.error('Error parsing ISO string:', error);
    return null;
  }
};
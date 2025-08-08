// src/utils/constants.js

// Roles de usuario
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin'
};

// Estados de tareas
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Prioridades de tareas
export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

// Tipos de eventos
export const EVENT_TYPES = {
  EXAM: 'exam',
  ASSIGNMENT: 'assignment',
  CLASS: 'class',
  MEETING: 'meeting',
  HOLIDAY: 'holiday'
};

// Tipos de notificaciones
export const NOTIFICATION_TYPES = {
  TASK_DUE: 'task_due',
  ANNOUNCEMENT: 'announcement',
  EVENT_REMINDER: 'event_reminder',
  SYSTEM: 'system'
};

// Colores para materias
export const SUBJECT_COLORS = {
  'Matemáticas': '#3B82F6',
  'Ciencias': '#10B981',
  'Historia': '#F59E0B',
  'Literatura': '#8B5CF6',
  'Inglés': '#EF4444',
  'Educación Física': '#06B6D4',
  'Arte': '#F97316',
  'Música': '#EC4899',
  'Geografía': '#84CC16',
  'Química': '#6366F1',
  'Física': '#14B8A6',
  'Biología': '#22C55E'
};

// Configuración de archivos
export const FILE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ]
};

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'Agenda Escolar',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'soporte@agendaescolar.com',
  PRIVACY_POLICY_URL: '/privacy',
  TERMS_OF_SERVICE_URL: '/terms'
};

// Configuración de Firebase Collections
export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
  TASKS: 'tasks',
  EVENTS: 'events',
  ANNOUNCEMENTS: 'announcements',
  NOTIFICATIONS: 'notifications',
  SUBJECTS: 'subjects',
  CLASSES: 'classes'
};

// Configuración de rutas
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CALENDAR: '/calendar',
  TASKS: '/tasks',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ADMIN: '/admin',
  FORGOT_PASSWORD: '/forgot-password'
};

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
  NOT_FOUND: 'El recurso solicitado no fue encontrado.',
  VALIDATION_ERROR: 'Los datos ingresados no son válidos.',
  SERVER_ERROR: 'Error interno del servidor. Intenta nuevamente.',
  FILE_TOO_LARGE: 'El archivo es demasiado grande.',
  INVALID_FILE_TYPE: 'Tipo de archivo no permitido.'
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Tarea creada exitosamente',
  TASK_UPDATED: 'Tarea actualizada exitosamente',
  TASK_DELETED: 'Tarea eliminada exitosamente',
  EVENT_CREATED: 'Evento creado exitosamente',
  PROFILE_UPDATED: 'Perfil actualizado exitosamente',
  SETTINGS_SAVED: 'Configuración guardada exitosamente'
};

// Configuración de validaciones
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  TASK_TITLE_MAX_LENGTH: 100,
  TASK_DESCRIPTION_MAX_LENGTH: 500,
  ANNOUNCEMENT_TITLE_MAX_LENGTH: 150,
  ANNOUNCEMENT_CONTENT_MAX_LENGTH: 1000
};

// Configuración de tiempo
export const TIME_CONFIG = {
  TASK_REMINDER_DAYS: [1, 3, 7], // Días antes del vencimiento para recordatorios
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 horas en millisegundos
  NOTIFICATION_CLEANUP_DAYS: 30 // Días después de los cuales se archivan las notificaciones
};

// Configuración de tema
export const THEME_CONFIG = {
  PRIMARY_COLOR: '#4F46E5',
  SECONDARY_COLOR: '#6B7280',
  SUCCESS_COLOR: '#10B981',
  WARNING_COLOR: '#F59E0B',
  ERROR_COLOR: '#EF4444',
  INFO_COLOR: '#3B82F6'
};
# Agenda Escolar

Una aplicación web moderna para la gestión de agendas escolares, desarrollada con React y Firebase.

## 🚀 Características

- **Gestión de Tareas**: Crear, editar y organizar tareas escolares
- **Calendario Integrado**: Visualización de eventos y fechas importantes
- **Notificaciones**: Sistema de alertas para recordatorios y anuncios
- **Multi-usuario**: Soporte para estudiantes, profesores y administradores
- **Tiempo Real**: Sincronización en tiempo real con Firebase
- **Responsive**: Diseño adaptativo para móviles y escritorio
- **PWA Ready**: Preparado para funcionar como Progressive Web App

## 🛠️ Tecnologías

- **Frontend**: React 18, React Router, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Estado**: Context API + useReducer
- **Fecha/Hora**: date-fns
- **Iconos**: Lucide React
- **Herramientas**: Create React App, ESLint

## 📋 Requisitos Previos

- Node.js 16.0 o superior
- npm o yarn
- Cuenta de Firebase

## ⚙️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/agenda-escolar.git
   cd agenda-escolar
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase**
   - Crear un proyecto en [Firebase Console](https://console.firebase.google.com)
   - Habilitar Authentication (Email/Password)
   - Crear una base de datos Firestore
   - Configurar Storage (opcional)
   - Copiar las credenciales de configuración

4. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Editar `.env` con tus credenciales de Firebase:
   ```
   REACT_APP_FIREBASE_API_KEY=tu_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=tu_proyecto_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   REACT_APP_FIREBASE_APP_ID=tu_app_id
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

## 🗂️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Calendar/       # Componentes del calendario
│   ├── TaskList/       # Componentes de tareas
│   ├── Notifications/  # Sistema de notificaciones
│   ├── UserMenu/      # Menú de usuario
│   ├── Announcements/ # Anuncios
│   └── Common/        # Componentes comunes
├── pages/             # Páginas principales
├── hooks/             # Hooks personalizados
├── services/          # Servicios (Firebase, APIs)
├── context/           # Context providers
├── utils/             # Funciones utilitarias
├── styles/            # Estilos globales
└── assets/            # Recursos estáticos
```

## 🔥 Configuración de Firebase

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Tasks collection
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Events collection
    match /events/{eventId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'teacher'];
    }
    
    // Announcements collection
    match /announcements/{announcementId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'teacher'];
    }
  }
}
```

### Authentication
Habilitar en Firebase Console:
- Email/Password
- Google (opcional)
- Configurar dominios autorizados

## 👥 Roles de Usuario

- **Estudiante**: Gestionar sus propias tareas y ver eventos/anuncios
- **Profesor**: Crear tareas para estudiantes, gestionar eventos y anuncios
- **Administrador**: Acceso completo al sistema

## 📱 Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm run eject`: Extrae la configuración de Create React App

## 🎨 Personalización

### Temas
La aplicación soporta temas claro y oscuro. Se puede configurar en:
- `src/context/SettingsContext.jsx`
- `src/styles/variables.css`

### Colores de Materias
Personalizar en `src/utils/constants.js`:
```javascript
export const SUBJECT_COLORS = {
  'Matemáticas': '#3B82F6',
  // ... más colores
};
```

## 📊 Base de Datos

### Colecciones de Firestore

#### users
```javascript
{
  uid: string,
  firstName: string,
  lastName: string,
  email: string,
  role: 'student' | 'teacher' | 'admin',
  createdAt: timestamp,
  updatedAt: timestamp,
  isActive: boolean,
  profilePicture?: string,
  phone?: string,
  grade?: string,
  subjects?: string[]
}
```

#### tasks
```javascript
{
  id: string,
  title: string,
  description?: string,
  subject: string,
  userId: string,
  assignedBy?: string,
  dueDate: timestamp,
  priority: 'low' | 'medium' | 'high' | 'urgent',
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled',
  completed: boolean,
  createdAt: timestamp,
  updatedAt: timestamp,
  attachments?: string[],
  tags?: string[]
}
```

#### events
```javascript
{
  id: string,
  title: string,
  description?: string,
  type: 'exam' | 'assignment' | 'class' | 'meeting' | 'holiday',
  startDate: timestamp,
  endDate: timestamp,
  location?: string,
  createdBy: string,
  attendees?: string[],
  isPublic: boolean,
  color: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### announcements
```javascript
{
  id: string,
  title: string,
  content: string,
  author: string,
  priority: 'low' | 'medium' | 'high',
  targetAudience: 'all' | 'students' | 'teachers',
  isPublished: boolean,
  publishDate: timestamp,
  expiryDate?: timestamp,
  attachments?: string[],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### notifications
```javascript
{
  id: string,
  userId: string,
  type: 'task_due' | 'announcement' | 'event_reminder' | 'system',
  title: string,
  message: string,
  isRead: boolean,
  data?: object,
  createdAt: timestamp,
  readAt?: timestamp
}
```

## 🔧 Desarrollo

### Estructura de Componentes
```
components/
├── Calendar/
│   ├── Calendar.jsx          # Componente principal del calendario
│   ├── CalendarDay.jsx       # Día individual del calendario
│   └── EventModal.jsx        # Modal para crear/editar eventos
├── TaskList/
│   ├── TaskList.jsx          # Lista de tareas
│   ├── TaskItem.jsx          # Item individual de tarea
│   └── TaskForm.jsx          # Formulario de tareas
├── Common/
│   ├── Header.jsx            # Barra de navegación
│   ├── Sidebar.jsx           # Menú lateral
│   ├── LoadingSpinner.jsx    # Indicador de carga
│   └── Modal.jsx             # Modal genérico
└── ...
```

### Hooks Personalizados
- `useAuth()`: Manejo de autenticación
- `useTasks()`: Gestión de tareas
- `useNotifications()`: Sistema de notificaciones

### Context Providers
- `AuthContext`: Estado de autenticación global
- `SettingsContext`: Configuraciones de usuario

## 🚀 Despliegue

### Firebase Hosting
1. **Instalar Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Inicializar proyecto**
   ```bash
   firebase init hosting
   ```

3. **Construir y desplegar**
   ```bash
   npm run build
   firebase deploy
   ```

### Vercel
1. **Conectar repositorio en Vercel**
2. **Configurar variables de entorno**
3. **Desplegar automáticamente**

### Netlify
1. **Conectar repositorio**
2. **Configurar build command**: `npm run build`
3. **Configurar publish directory**: `build`

## 📈 Funcionalidades Futuras

- [ ] Notificaciones push
- [ ] Modo offline con PWA
- [ ] Integración con Google Calendar
- [ ] Sistema de calificaciones
- [ ] Chat en tiempo real
- [ ] Reportes y estadísticas
- [ ] API móvil
- [ ] Integración con LMS

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### Estándares de Código
- Usar ESLint para el linting
- Seguir las convenciones de nombres de React
- Documentar componentes complejos
- Escribir tests para funcionalidades críticas

## 🐛 Reportar Bugs

Usar el sistema de Issues de GitHub con la siguiente información:
- Descripción del bug
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Información del navegador/dispositivo

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- [React](https://reactjs.org/) - Framework de JavaScript
- [Firebase](https://firebase.google.com/) - Backend como servicio
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Lucide](https://lucide.dev/) - Iconos
- [date-fns](https://date-fns.org/) - Manipulación de fechas

## 📚 Documentación Adicional

- [Guía de Configuración de Firebase](docs/firebase-setup.md)
- [API Reference](docs/api-reference.md)
- [Guía de Estilos](docs/style-guide.md)
- [Deployment Guide](docs/deployment.md)
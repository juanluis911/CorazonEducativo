// src/components/Common/Sidebar.jsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  Megaphone, 
  User, 
  Settings,
  Shield,
  BookOpen,
  Bell,
  X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isOpen = true, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Cerrar sidebar al hacer clic en overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  // Cerrar sidebar al hacer clic en un enlace (solo en móvil)
  const handleLinkClick = () => {
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  // Elementos del menú según el rol del usuario
  const getMenuItems = () => {
    const baseItems = [
      {
        icon: Home,
        label: 'Dashboard',
        href: '/dashboard',
        roles: ['student', 'teacher', 'admin']
      },
      {
        icon: Calendar,
        label: 'Calendario',
        href: '/calendar',
        roles: ['student', 'teacher', 'admin']
      },
      {
        icon: CheckSquare,
        label: 'Tareas',
        href: '/tasks',
        roles: ['student', 'teacher', 'admin']
      },
      {
        icon: BookOpen,
        label: 'Materias',
        href: '/subjects',
        roles: ['student', 'teacher', 'admin']
      },
      {
        icon: Megaphone,
        label: 'Anuncios',
        href: '/announcements',
        roles: ['student', 'teacher', 'admin']
      },
      {
        icon: Bell,
        label: 'Notificaciones',
        href: '/notifications',
        roles: ['student', 'teacher', 'admin']
      },
      {
        icon: User,
        label: 'Perfil',
        href: '/profile',
        roles: ['student', 'teacher', 'admin']
      },
      {
        icon: Settings,
        label: 'Configuración',
        href: '/settings',
        roles: ['student', 'teacher', 'admin']
      }
    ];

    // Agregar elementos para admin
    if (user?.role === 'admin') {
      baseItems.splice(-2, 0, {
        icon: Shield,
        label: 'Administración',
        href: '/admin',
        roles: ['admin']
      });
    }

    return baseItems.filter(item => 
      item.roles.includes(user?.role || 'student')
    );
  };

  const menuItems = getMenuItems();

  const isActive = (href) => {
    return location.pathname === href;
  };

  // Determinar si estamos en móvil
  const isMobile = window.innerWidth < 1024;

  return (
    <>
      {/* Overlay para móvil - solo se muestra si está abierto en móvil */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed' : 'sticky top-0'} inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700
        ${isMobile ? 
          `transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}` 
          : 'h-screen'
        }
      `}>
        {/* Header del sidebar */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Agenda Escolar
          </h2>
          
          {/* Botón cerrar - solo en móvil */}
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Información del usuario */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}`
                  : user?.email || 'Usuario'
                }
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role === 'admin' ? 'Administrador' : 
                 user?.role === 'teacher' ? 'Profesor' : 'Estudiante'}
              </p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={handleLinkClick}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md
                  transition-colors duration-200
                  ${active 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-r-2 border-indigo-500' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <IconComponent className={`
                  mr-3 h-5 w-5 flex-shrink-0
                  ${active ? 'text-indigo-500' : 'text-gray-400'}
                `} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Agenda Escolar v1.0.0
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
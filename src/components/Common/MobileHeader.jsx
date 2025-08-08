// src/components/Common/MobileHeader.jsx
import React, { useState, useEffect } from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const MobileHeader = ({ 
  title = "Agenda Escolar", 
  onMenuClick, 
  showNotifications = true,
  showSearch = false 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  // Manejar scroll para efecto de header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`
      lg:hidden sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700
      ${isScrolled ? 'shadow-md' : 'shadow-sm'}
      transition-shadow duration-200
    `}>
      <div className="flex items-center justify-between h-16 px-4">
        {/* Botón menú */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Título */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate mx-4 flex-1 text-center">
          {title}
        </h1>

        {/* Acciones */}
        <div className="flex items-center space-x-1">
          {showSearch && (
            <button
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {showNotifications && (
            <button
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors"
              aria-label="Notificaciones"
            >
              <Bell className="w-5 h-5" />
              {/* Badge de notificaciones */}
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </span>
            </button>
          )}
          
          {/* Avatar del usuario */}
          <button
            className="p-1 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Perfil de usuario"
          >
            <div className="w-7 h-7 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
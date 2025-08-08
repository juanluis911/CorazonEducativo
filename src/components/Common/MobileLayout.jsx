// src/components/Common/MobileLayout.jsx
import React, { useState, useEffect } from 'react';
import { Menu, Bell, User, X } from 'lucide-react';
import Sidebar from './Sidebar';

const MobileLayout = ({ 
  children, 
  title = "Agenda Escolar",
  showNotifications = true,
  className = ""
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Manejar scroll para efecto de header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar sidebar cuando cambie el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll del body cuando el sidebar está abierto
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      {/* Header móvil */}
      <header className={`
        lg:hidden sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700
        ${isScrolled ? 'shadow-md' : 'shadow-sm'}
        transition-shadow duration-200
      `}>
        <div className="flex items-center justify-between h-16 px-4">
          {/* Botón menú */}
          <button
            onClick={openSidebar}
            className="mobile-btn btn-ghost p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Título */}
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate mx-4">
            {title}
          </h1>

          {/* Acciones */}
          <div className="flex items-center space-x-2">
            {showNotifications && (
              <button
                className="mobile-btn btn-ghost p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors"
                aria-label="Notificaciones"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            )}
            
            <button
              className="mobile-btn btn-ghost p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Perfil de usuario"
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Layout principal */}
      <div className="lg:flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <Sidebar isOpen={true} onClose={closeSidebar} />
          </div>
        </div>

        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        )}

        {/* Contenido principal */}
        <main className="flex-1 lg:overflow-hidden">
          <div className="h-full lg:flex lg:flex-col">
            {/* Header desktop (opcional) */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h1>
              </div>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto">
              <div className="container mx-auto px-4 py-6 lg:px-6">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Componente para el contenido del sidebar (si necesitas reutilizarlo)
export const SidebarContent = ({ onItemClick }) => {
  // Este componente puede contener los elementos del menú
  // si quieres separar la lógica del contenido
  return null; // Implementar según necesidad
};

export default MobileLayout;
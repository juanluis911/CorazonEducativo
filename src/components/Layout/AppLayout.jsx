// src/components/Layout/AppLayout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Common/Sidebar';
import MobileHeader from '../Common/MobileHeader';
import { useSidebar } from '../../hooks/useSidebar';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const sidebar = useSidebar();

  // Obtener el título de la página basado en la ruta
  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/dashboard': 'Dashboard',
      '/calendar': 'Calendario',
      '/tasks': 'Tareas',
      '/subjects': 'Materias',
      '/announcements': 'Anuncios',
      '/notifications': 'Notificaciones',
      '/profile': 'Perfil',
      '/settings': 'Configuración',
      '/admin': 'Administración'
    };
    
    return titles[path] || 'Agenda Escolar';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header móvil */}
      <MobileHeader 
        title={getPageTitle()}
        onMenuClick={sidebar.open}
        showNotifications={true}
      />

      {/* Layout principal */}
      <div className="lg:flex">
        {/* Sidebar - UNA SOLA INSTANCIA que funciona para móvil Y desktop */}
        <Sidebar 
          isOpen={sidebar.isMobile ? sidebar.isOpen : true} 
          onClose={sidebar.close} 
        />

        {/* Contenido principal */}
        <main className="flex-1 min-h-0">
          {/* Header desktop (opcional) */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          {/* Contenido */}
          <div className="overflow-y-auto h-full">
            <div className="container mx-auto px-4 py-6 lg:px-6 max-w-7xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
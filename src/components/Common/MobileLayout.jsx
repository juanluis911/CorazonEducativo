// src/components/Common/MobileLayout.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Bell, User } from 'lucide-react';

const MobileLayout = ({ children, title = "Agenda Escolar", showNotifications = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mobile-layout">
      {/* Header */}
      <header className={`mobile-header transition-all duration-200 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}>
        <div className="flex items-center justify-between h-16 px-4">
          {/* Botón menú */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="mobile-btn btn-ghost p-2"
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
                className="mobile-btn btn-ghost p-2 relative"
                aria-label="Notificaciones"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            )}
            
            <button
              className="mobile-btn btn-ghost p-2"
              aria-label="Perfil de usuario"
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar content */}
          <div className="sidebar open z-50">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Menú
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="mobile-btn btn-ghost p-2"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex-1 p-4">
              {/* Aquí van los elementos del menú */}
              <SidebarContent onItemClick={() => setSidebarOpen(false)} />
            </nav>
          </div>
        </>
      )}

      {/* Contenido principal */}
      <main className="mobile-main overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
};
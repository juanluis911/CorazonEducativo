// src/components/Common/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, Search } from 'lucide-react';
import UserMenu from '../UserMenu/UserMenu';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ onMenuToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (onMenuToggle) {
      onMenuToggle(!isMobileMenuOpen);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Lado izquierdo - Logo y menú móvil */}
          <div className="flex items-center">
            {/* Botón menú móvil */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center ml-4 lg:ml-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900 hidden sm:block">
                  Agenda Escolar
                </span>
              </div>
            </Link>
          </div>

          {/* Centro - Navegación (solo desktop) */}
          <nav className="hidden lg:flex space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/calendar"
              className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Calendario
            </Link>
            <Link
              to="/tasks"
              className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Tareas
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Administración
              </Link>
            )}
          </nav>

          {/* Lado derecho - Búsqueda, notificaciones y usuario */}
          <div className="flex items-center space-x-4">
            {/* Búsqueda (oculta en móvil) */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Notificaciones */}
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <Bell size={20} />
              {/* Badge de notificaciones */}
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {/* Menú de usuario */}
            <UserMenu />
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-gray-50 border-t">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/calendar"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calendario
            </Link>
            <Link
              to="/tasks"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tareas
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Administración
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
// src/components/Common/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import UserMenu from '../UserMenu/UserMenu';
import { Bell, Menu, Search } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar lógica de búsqueda
    console.log('Buscar:', searchQuery);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y navegación */}
          <div className="flex items-center">
            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center ml-4 lg:ml-0">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-indigo-600">
                  Agenda Escolar
                </h1>
              </div>
            </Link>

            {/* Navegación desktop */}
            <nav className="hidden lg:ml-8 lg:flex lg:space-x-8">
              <Link
                to="/dashboard"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/calendar"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Calendario
              </Link>
              <Link
                to="/tasks"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Tareas
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Administración
                </Link>
              )}
            </nav>
          </div>

          {/* Barra de búsqueda */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar tareas, eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </form>
          </div>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-4">
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
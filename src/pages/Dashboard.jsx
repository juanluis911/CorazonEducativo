// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import Calendar from '../components/Calendar/Calendar';
import TaskList from '../components/TaskList/TaskList';
import NotificationList from '../components/Notifications/NotificationList';
import AnnouncementList from '../components/Announcements/AnnouncementList';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Bienvenida */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                ¡Bienvenido, {user?.firstName || user?.displayName || 'Usuario'}!
              </h1>
              <p className="text-gray-600">
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Grid de contenido */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Calendario */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Calendario</h2>
                  <Calendar />
                </div>

                {/* Tareas */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Mis Tareas</h2>
                  <TaskList />
                </div>
              </div>

              {/* Sidebar derecho */}
              <div className="space-y-6">
                {/* Notificaciones */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Notificaciones</h2>
                  <NotificationList />
                </div>

                {/* Anuncios */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Anuncios</h2>
                  <AnnouncementList />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
// src/pages/Dashboard.jsx - Dashboard principal que detecta el rol
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  // Detectar rol del usuario y renderizar el dashboard apropiado
  switch (user?.role) {
    case 'teacher':
      return <TeacherDashboard />;
    
    case 'admin':
      return <AdminDashboard />;
    
    case 'student':
    default:
      return <StudentDashboard />;
  }
};

export default Dashboard;
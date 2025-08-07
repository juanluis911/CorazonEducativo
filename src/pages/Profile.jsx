// src/pages/Profile.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Mi Perfil</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rol</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{user?.role}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de registro</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {user?.createdAt?.toDate?.()?.toLocaleDateString('es-ES') || 'No disponible'}
                  </p>
                </div>
                
                <div className="pt-4">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                    Editar Perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
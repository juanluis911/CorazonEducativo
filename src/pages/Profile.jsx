// src/pages/Profile.jsx
import React, { useState } from 'react';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Phone, Calendar, Edit, Save, X } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    grade: user?.grade || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log('Guardando cambios:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Restaurar datos originales
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      grade: user?.grade || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow">
              {/* Header del perfil */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
                  
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Contenido del perfil */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Avatar y información básica */}
                  <div className="lg:col-span-1">
                    <div className="text-center">
                      <div className="mx-auto h-32 w-32 bg-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-medium text-gray-900">
                        {user?.firstName && user?.lastName 
                          ? `${user.firstName} ${user.lastName}`
                          : user?.email || 'Usuario'
                        }
                      </h3>
                      <p className="text-gray-500 capitalize">
                        {user?.role === 'admin' ? 'Administrador' : 
                         user?.role === 'teacher' ? 'Profesor' : 'Estudiante'}
                      </p>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-5 h-5 mr-3" />
                        <span className="text-sm">{user?.email}</span>
                      </div>
                      {user?.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-5 h-5 mr-3" />
                          <span className="text-sm">{user.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-3" />
                        <span className="text-sm">
                          Miembro desde {new Date(user?.createdAt?.toDate?.() || Date.now()).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Formulario de información */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Información Personal
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nombre
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            ) : (
                              <p className="text-gray-900 py-2">{formData.firstName || 'No especificado'}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Apellido
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            ) : (
                              <p className="text-gray-900 py-2">{formData.lastName || 'No especificado'}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Correo electrónico
                            </label>
                            <p className="text-gray-900 py-2">{formData.email}</p>
                            <p className="text-xs text-gray-500">
                              No se puede modificar el correo electrónico
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Teléfono
                            </label>
                            {isEditing ? (
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="(555) 123-4567"
                              />
                            ) : (
                              <p className="text-gray-900 py-2">{formData.phone || 'No especificado'}</p>
                            )}
                          </div>

                          {user?.role === 'student' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Grado
                              </label>
                              {isEditing ? (
                                <select
                                  name="grade"
                                  value={formData.grade}
                                  onChange={handleChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                  <option value="">Seleccionar grado</option>
                                  <option value="1ro">1ro</option>
                                  <option value="2do">2do</option>
                                  <option value="3ro">3ro</option>
                                  <option value="4to">4to</option>
                                  <option value="5to">5to</option>
                                  <option value="6to">6to</option>
                                </select>
                              ) : (
                                <p className="text-gray-900 py-2">{formData.grade || 'No especificado'}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
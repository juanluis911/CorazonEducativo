// src/pages/Profile.jsx
import React, { useState } from 'react';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Phone, Calendar, Edit, Save, X, Shield, BookOpen } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    grade: user?.grade || '',
    bio: user?.bio || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      // Aquí iría la lógica para guardar los cambios en Firebase
      console.log('Guardando cambios:', formData);
      
      // Simular guardado exitoso
      setIsEditing(false);
      
      // Aquí podrías mostrar una notificación de éxito
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al actualizar el perfil');
    }
  };

  const handleCancel = () => {
    // Restaurar datos originales
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      grade: user?.grade || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'teacher': return 'Profesor';
      case 'student': return 'Estudiante';
      default: return 'Usuario';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return Shield;
      case 'teacher': return BookOpen;
      case 'student': return User;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon(user?.role);

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
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                      <div className="flex items-center justify-center mt-2">
                        <RoleIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <p className="text-gray-500 capitalize">
                          {getRoleDisplayName(user?.role)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-5 h-5 mr-3" />
                        <span className="text-sm">{user?.email}</span>
                      </div>
                      {formData.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-5 h-5 mr-3" />
                          <span className="text-sm">{formData.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-3" />
                        <span className="text-sm">
                          Miembro desde {new Date(user?.createdAt?.toDate?.() || Date.now()).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                    </div>

                    {/* Estadísticas del usuario */}
                    {user?.role === 'student' && (
                      <div className="mt-6 bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Mi Progreso</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tareas completadas</span>
                            <span className="font-medium">8/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {user?.role === 'teacher' && (
                      <div className="mt-6 bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Mis Estadísticas</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Estudiantes</span>
                            <span className="font-medium">45</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tareas creadas</span>
                            <span className="font-medium">12</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Eventos programados</span>
                            <span className="font-medium">8</span>
                          </div>
                        </div>
                      </div>
                    )}
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Tu nombre"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Tu apellido"
                              />
                            ) : (
                              <p className="text-gray-900 py-2">{formData.lastName || 'No especificado'}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Correo electrónico
                            </label>
                            <p className="text-gray-900 py-2 bg-gray-50 px-3 rounded-md">{formData.email}</p>
                            <p className="text-xs text-gray-500 mt-1">
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                  <option value="">Seleccionar grado</option>
                                  <option value="9A">9° A</option>
                                  <option value="9B">9° B</option>
                                  <option value="10A">10° A</option>
                                  <option value="10B">10° B</option>
                                  <option value="11A">11° A</option>
                                  <option value="11B">11° B</option>
                                </select>
                              ) : (
                                <p className="text-gray-900 py-2">{formData.grade || 'No especificado'}</p>
                              )}
                            </div>
                          )}

                          {user?.role === 'teacher' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Materias que enseña
                              </label>
                              <p className="text-gray-900 py-2">Matemáticas, Física</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Para modificar las materias, contacta al administrador
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Biografía */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Acerca de mí
                        </h4>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Biografía
                          </label>
                          {isEditing ? (
                            <textarea
                              name="bio"
                              value={formData.bio}
                              onChange={handleChange}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="Cuéntanos un poco sobre ti..."
                            />
                          ) : (
                            <p className="text-gray-900 py-2 min-h-20">
                              {formData.bio || 'No has agregado información sobre ti.'}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Configuraciones de cuenta */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Configuración de Cuenta
                        </h4>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h5 className="text-sm font-medium text-gray-900">Notificaciones por email</h5>
                              <p className="text-xs text-gray-600">Recibir notificaciones importantes por correo</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h5 className="text-sm font-medium text-gray-900">Recordatorios de tareas</h5>
                              <p className="text-xs text-gray-600">Recordatorios automáticos antes de las fechas límite</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Cambiar contraseña */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Seguridad
                        </h4>
                        
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Cambiar contraseña
                        </button>
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
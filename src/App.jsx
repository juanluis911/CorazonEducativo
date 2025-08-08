// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout Components
import AppLayout from './components/Layout/AppLayout';
import LoadingSpinner from './components/Common/LoadingSpinner';

// Páginas
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import Subjects from './pages/Subjects';
import Announcements from './pages/Announcements';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

// Importar estilos globales
import './styles/globals.css';

// Componente para rutas protegidas
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
};

// Componente para rutas públicas (solo sin autenticación)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Las páginas públicas no usan el AppLayout
  return children;
};

// Componente para las rutas dentro del contexto de autenticación
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas - sin layout */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      {/* Rutas protegidas - con layout responsivo */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/tasks" 
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/calendar" 
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/subjects" 
        element={
          <ProtectedRoute>
            <Subjects />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/announcements" 
        element={
          <ProtectedRoute>
            <Announcements />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminPanel />
          </ProtectedRoute>
        } 
      />

      {/* Ruta por defecto */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
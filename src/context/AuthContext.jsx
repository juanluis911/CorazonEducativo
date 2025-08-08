// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';

// Estados del contexto
const initialState = {
  user: null,
  loading: true,
  error: null
};

// Reducer para manejar las acciones
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Crear el contexto
export const AuthContext = createContext();

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Función para obtener datos adicionales del usuario desde Firestore
  const getUserData = async (user) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        return { ...user, ...userDoc.data() };
      }
      // Si no existe el documento, devolver solo los datos de Firebase Auth
      console.log('Documento de usuario no encontrado en Firestore');
      return user;
    } catch (error) {
      console.error('Error obteniendo datos del usuario:', error);
      // En caso de error, devolver solo los datos de Firebase Auth
      return user;
    }
  };

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Usuario autenticado
        const userData = await getUserData(user);
        dispatch({ type: 'SET_USER', payload: userData });
      } else {
        // Usuario no autenticado
        dispatch({ type: 'SET_USER', payload: null });
      }
    });

    return () => unsubscribe();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userData = await getUserData(result.user);
      
      dispatch({ type: 'SET_USER', payload: userData });
      return { success: true, user: userData };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: error.message };
    }
  };

  // Función para registrarse
  const register = async (email, password, userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      console.log('Iniciando registro con datos:', userData);

      // Crear usuario en Firebase Auth
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar perfil con nombre
      if (userData.firstName) {
        await updateProfile(result.user, {
          displayName: `${userData.firstName} ${userData.lastName || ''}`
        });
      }

      // Guardar datos adicionales en Firestore
      const userDocData = {
        uid: result.user.uid,
        email: result.user.email,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        role: userData.role, // ⭐ Quité el valor por defecto
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      };

      console.log('Guardando datos en Firestore:', userDocData);

      await setDoc(doc(db, 'users', result.user.uid), userDocData);

      const fullUserData = { ...result.user, ...userDocData };
      dispatch({ type: 'SET_USER', payload: fullUserData });
      
      console.log('Usuario registrado exitosamente:', fullUserData);
      
      return { success: true, user: fullUserData };
    } catch (error) {
      console.error('Error en registro:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: error.message };
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'SET_USER', payload: null });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Función para restablecer contraseña
  const resetPassword = async (email) => {
    try {
      dispatch({ type: 'CLEAR_ERROR' });
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Función para limpiar errores
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Valores del contexto
  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    resetPassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
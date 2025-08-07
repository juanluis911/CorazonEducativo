// src/services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Configuración de Firebase usando variables de entorno
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Verificar que todas las variables de entorno estén presentes
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Variables de entorno faltantes:', missingEnvVars);
  console.error('Por favor, verifica tu archivo .env');
} else {
  console.log('✅ Configuración de Firebase cargada correctamente');
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Inicializar Analytics solo en producción y si measurementId está disponible
export let analytics = null;
if (process.env.NODE_ENV === 'production' && firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(app);
    console.log('✅ Firebase Analytics inicializado');
  } catch (error) {
    console.warn('⚠️ No se pudo inicializar Analytics:', error);
  }
}

// Solo para desarrollo - conectar emuladores si están disponibles
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_FIREBASE_EMULATOR === 'true') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log('🔧 Conectado al emulador de Firestore');
  } catch (error) {
    console.log('⚠️ Error conectando emulador Firestore:', error);
  }
}

// Exportar configuración para debugging (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  window.__FIREBASE_CONFIG__ = firebaseConfig;
  console.log('🔥 Firebase configurado para:', firebaseConfig.projectId);
}

export default app;
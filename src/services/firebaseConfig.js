// src/services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAK2cL8DQ4TOOt-bYUATmw8IFmLhgIg8Sc",
  authDomain: "corazoneducativo.firebaseapp.com",
  projectId: "corazoneducativo",
  storageBucket: "corazoneducativo.firebasestorage.app",
  messagingSenderId: "197048030373",
  appId: "1:197048030373:web:827e6b83f57453950de94c",
  measurementId: "G-SL5ZEZFNL3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
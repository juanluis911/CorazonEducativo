// src/services/eventService.js
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { FIREBASE_COLLECTIONS } from '../utils/constants';

// Crear nuevo evento
export const createEvent = async (eventData, userEmail) => {
  try {
    // Convertir la fecha string a Timestamp de Firestore
    const eventDate = new Date(eventData.date);
    
    // Preparar datos para Firestore
    const firestoreEventData = {
      ...eventData,
      date: Timestamp.fromDate(eventDate),
      createdBy: userEmail,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Agregar a la colección de eventos
    const docRef = await addDoc(collection(db, FIREBASE_COLLECTIONS.EVENTS), firestoreEventData);
    
    // Retornar el evento con su ID
    return {
      id: docRef.id,
      ...eventData,
      date: eventDate,
      createdBy: userEmail,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Error creando evento:', error);
    throw new Error('No se pudo crear el evento. Intenta nuevamente.');
  }
};

// Obtener todos los eventos
export const getEvents = async () => {
  try {
    const eventsQuery = query(
      collection(db, FIREBASE_COLLECTIONS.EVENTS),
      orderBy('date', 'asc')
    );
    
    const querySnapshot = await getDocs(eventsQuery);
    const events = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      events.push({
        id: doc.id,
        ...data,
        // Convertir Timestamp de Firestore a Date
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      });
    });
    
    return events;
  } catch (error) {
    console.error('Error obteniendo eventos:', error);
    throw new Error('No se pudieron cargar los eventos.');
  }
};

// Obtener eventos por rango de fechas
export const getEventsByDateRange = async (startDate, endDate) => {
  try {
    const eventsQuery = query(
      collection(db, FIREBASE_COLLECTIONS.EVENTS),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate)),
      orderBy('date', 'asc')
    );
    
    const querySnapshot = await getDocs(eventsQuery);
    const events = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      events.push({
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      });
    });
    
    return events;
  } catch (error) {
    console.error('Error obteniendo eventos por rango de fechas:', error);
    throw new Error('No se pudieron cargar los eventos.');
  }
};

// Obtener eventos de un usuario específico
export const getEventsByUser = async (userEmail) => {
  try {
    const eventsQuery = query(
      collection(db, FIREBASE_COLLECTIONS.EVENTS),
      where('createdBy', '==', userEmail),
      orderBy('date', 'asc')
    );
    
    const querySnapshot = await getDocs(eventsQuery);
    const events = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      events.push({
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      });
    });
    
    return events;
  } catch (error) {
    console.error('Error obteniendo eventos del usuario:', error);
    throw new Error('No se pudieron cargar tus eventos.');
  }
};

// Obtener un evento específico por ID
export const getEventById = async (eventId) => {
  try {
    const docRef = doc(db, FIREBASE_COLLECTIONS.EVENTS, eventId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      };
    } else {
      throw new Error('Evento no encontrado');
    }
  } catch (error) {
    console.error('Error obteniendo evento:', error);
    throw new Error('No se pudo cargar el evento.');
  }
};

// Actualizar evento existente
export const updateEvent = async (eventId, eventData) => {
  try {
    // Convertir la fecha string a Timestamp de Firestore si es necesaria
    const updateData = { ...eventData };
    
    if (updateData.date) {
      const eventDate = new Date(updateData.date);
      updateData.date = Timestamp.fromDate(eventDate);
    }
    
    // Agregar timestamp de actualización
    updateData.updatedAt = serverTimestamp();
    
    // Actualizar documento
    const docRef = doc(db, FIREBASE_COLLECTIONS.EVENTS, eventId);
    await updateDoc(docRef, updateData);
    
    // Retornar los datos actualizados
    return {
      id: eventId,
      ...eventData,
      date: eventData.date ? new Date(eventData.date) : undefined,
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Error actualizando evento:', error);
    throw new Error('No se pudo actualizar el evento. Intenta nuevamente.');
  }
};

// Eliminar evento
export const deleteEvent = async (eventId) => {
  try {
    const docRef = doc(db, FIREBASE_COLLECTIONS.EVENTS, eventId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error eliminando evento:', error);
    throw new Error('No se pudo eliminar el evento. Intenta nuevamente.');
  }
};

// Obtener eventos públicos
export const getPublicEvents = async () => {
  try {
    const eventsQuery = query(
      collection(db, FIREBASE_COLLECTIONS.EVENTS),
      where('isPublic', '==', true),
      orderBy('date', 'asc')
    );
    
    const querySnapshot = await getDocs(eventsQuery);
    const events = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      events.push({
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      });
    });
    
    return events;
  } catch (error) {
    console.error('Error obteniendo eventos públicos:', error);
    throw new Error('No se pudieron cargar los eventos públicos.');
  }
};

// Obtener eventos por tipo
export const getEventsByType = async (eventType) => {
  try {
    const eventsQuery = query(
      collection(db, FIREBASE_COLLECTIONS.EVENTS),
      where('type', '==', eventType),
      orderBy('date', 'asc')
    );
    
    const querySnapshot = await getDocs(eventsQuery);
    const events = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      events.push({
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      });
    });
    
    return events;
  } catch (error) {
    console.error('Error obteniendo eventos por tipo:', error);
    throw new Error('No se pudieron cargar los eventos.');
  }
};

// Obtener eventos próximos (siguientes 30 días)
export const getUpcomingEvents = async (days = 30) => {
  try {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);
    
    const eventsQuery = query(
      collection(db, FIREBASE_COLLECTIONS.EVENTS),
      where('date', '>=', Timestamp.fromDate(now)),
      where('date', '<=', Timestamp.fromDate(futureDate)),
      orderBy('date', 'asc')
    );
    
    const querySnapshot = await getDocs(eventsQuery);
    const events = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      events.push({
        id: doc.id,
        ...data,
        date: data.date?.toDate() || new Date(),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      });
    });
    
    return events;
  } catch (error) {
    console.error('Error obteniendo eventos próximos:', error);
    throw new Error('No se pudieron cargar los eventos próximos.');
  }
};

// Verificar permisos de edición
export const canEditEvent = (event, userEmail, userRole) => {
  // El creador puede editar su evento
  if (event.createdBy === userEmail) {
    return true;
  }
  
  // Los administradores pueden editar cualquier evento
  if (userRole === 'admin') {
    return true;
  }
  
  // Los profesores pueden editar eventos públicos de otros profesores
  if (userRole === 'teacher' && event.isPublic) {
    return true;
  }
  
  return false;
};

// Verificar permisos de eliminación
export const canDeleteEvent = (event, userEmail, userRole) => {
  // El creador puede eliminar su evento
  if (event.createdBy === userEmail) {
    return true;
  }
  
  // Los administradores pueden eliminar cualquier evento
  if (userRole === 'admin') {
    return true;
  }
  
  return false;
};
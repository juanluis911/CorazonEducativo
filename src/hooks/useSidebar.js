// src/hooks/useSidebar.js
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Detectar si estamos en móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Verificar inicialmente
    checkIfMobile();

    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Cerrar sidebar automáticamente en desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  // Cerrar sidebar cuando cambie la ruta (navegación)
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile, isOpen]);

  // Prevenir scroll del body cuando sidebar está abierto en móvil
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Cerrar sidebar al navegar (útil con React Router)
  const closeOnNavigate = useCallback(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return {
    isOpen,
    isMobile,
    open,
    close,
    toggle,
    closeOnNavigate
  };
};
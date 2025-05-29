'use client';

import { useState, useEffect } from 'react';

// Hook personalizado para detectar media queries
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Establecer el valor inicial
    setMatches(mediaQuery.matches);

    // Definir callback para actualizar el estado
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Agregar listener
    mediaQuery.addEventListener('change', handleChange);

    // Limpiar listener
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

// Hooks predefinidos para tamaños comunes
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () =>
  useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

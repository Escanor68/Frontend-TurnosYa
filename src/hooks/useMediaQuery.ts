'use client';

import { useState, useEffect, useCallback } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, string> = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

interface MediaQueryState {
  matches: boolean;
  breakpoint: Breakpoint | null;
  isLoading: boolean;
}

export const useMediaQuery = (query: string | Breakpoint): MediaQueryState => {
  const [state, setState] = useState<MediaQueryState>({
    matches: false,
    breakpoint: null,
    isLoading: true,
  });

  const mediaQuery = typeof query === 'string' ? query : breakpoints[query];

  const handleChange = useCallback(
    (event: MediaQueryListEvent) => {
      setState((prev) => ({
        ...prev,
        matches: event.matches,
        breakpoint: typeof query === 'string' ? null : query,
        isLoading: false,
      }));
    },
    [query]
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);

    // Establecer el estado inicial
    setState((prev) => ({
      ...prev,
      matches: mediaQueryList.matches,
      breakpoint: typeof query === 'string' ? null : query,
      isLoading: false,
    }));

    // Agregar el listener
    mediaQueryList.addEventListener('change', handleChange);

    // Limpiar el listener
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [mediaQuery, handleChange]);

  return state;
};

// Hooks predefinidos para breakpoints comunes
export const useIsMobile = () => useMediaQuery('sm').matches;
export const useIsTablet = () => useMediaQuery('md').matches;
export const useIsDesktop = () => useMediaQuery('lg').matches;
export const useIsLargeDesktop = () => useMediaQuery('xl').matches;
export const useIsExtraLargeDesktop = () => useMediaQuery('2xl').matches;

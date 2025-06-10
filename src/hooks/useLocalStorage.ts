'use client';

import { useState, useEffect, useCallback } from 'react';

interface StorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: Error) => void;
}

const defaultOptions = {
  serializer: JSON.stringify as <T>(value: T) => string,
  deserializer: JSON.parse as <T>(value: string) => T,
  onError: (error: Error) => console.error('Error en useLocalStorage:', error),
};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: StorageOptions<T> = {}
) => {
  const { serializer, deserializer, onError } = {
    ...defaultOptions,
    ...options,
  };

  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer!(item) : initialValue;
    } catch (error) {
      onError!(
        error instanceof Error
          ? error
          : new Error('Error al leer del localStorage')
      );
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(state) : value;
        setState(valueToStore);
        window.localStorage.setItem(key, serializer!(valueToStore));
      } catch (error) {
        onError!(
          error instanceof Error
            ? error
            : new Error('Error al escribir en localStorage')
        );
      }
    },
    [key, serializer, state, onError]
  );

  const removeValue = useCallback(() => {
    try {
      setState(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      onError!(
        error instanceof Error
          ? error
          : new Error('Error al eliminar del localStorage')
      );
    }
  }, [key, initialValue, onError]);

  const clearAll = useCallback(() => {
    try {
      setState(initialValue);
      window.localStorage.clear();
    } catch (error) {
      onError!(
        error instanceof Error
          ? error
          : new Error('Error al limpiar localStorage')
      );
    }
  }, [initialValue, onError]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setState(deserializer!(event.newValue));
        } catch (error) {
          onError!(
            error instanceof Error
              ? error
              : new Error('Error al deserializar el valor')
          );
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserializer, onError]);

  return {
    value: state,
    setValue,
    removeValue,
    clearAll,
  };
};

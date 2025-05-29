'use client';

import { useState, useEffect } from 'react';

// Hook personalizado para trabajar con localStorage
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Estado para almacenar nuestro valor
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Inicializar el estado con el valor de localStorage o el valor inicial
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  // Función para actualizar el valor en localStorage y el estado
  const setValue = (value: T): void => {
    try {
      // Permitir que value sea una función para seguir el mismo patrón que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Guardar en el estado
      setStoredValue(valueToStore);

      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

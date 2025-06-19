import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAccessibilityOptions {
  announceChanges?: boolean;
  manageFocus?: boolean;
  keyboardNavigation?: boolean;
}

interface AccessibilityState {
  isAnnouncing: boolean;
  focusableElements: HTMLElement[];
  currentFocusIndex: number;
}

export const useAccessibility = (options: UseAccessibilityOptions = {}) => {
  const {
    announceChanges = true,
    manageFocus = true,
    keyboardNavigation = true,
  } = options;

  const [state, setState] = useState<AccessibilityState>({
    isAnnouncing: false,
    focusableElements: [],
    currentFocusIndex: 0,
  });

  const liveRegionRef = useRef<HTMLDivElement>(null);
  const focusTrapRef = useRef<HTMLDivElement>(null);

  // Anunciar cambios a lectores de pantalla
  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      if (!announceChanges || !liveRegionRef.current) return;

      setState((prev) => ({ ...prev, isAnnouncing: true }));

      const liveRegion = liveRegionRef.current;
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.textContent = message;

      // Limpiar el mensaje después de un tiempo
      setTimeout(() => {
        if (liveRegion) {
          liveRegion.textContent = '';
        }
        setState((prev) => ({ ...prev, isAnnouncing: false }));
      }, 1000);
    },
    [announceChanges]
  );

  // Gestionar el foco dentro de un contenedor
  const manageFocusTrap = useCallback(() => {
    if (!manageFocus || !focusTrapRef.current) return;

    const container = focusTrapRef.current;
    const focusableElements = Array.from(
      container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    setState((prev) => ({
      ...prev,
      focusableElements,
    }));

    // Enfocar el primer elemento si no hay ninguno enfocado
    if (!container.contains(document.activeElement)) {
      focusableElements[0]?.focus();
    }
  }, [manageFocus]);

  // Navegación por teclado
  const handleKeyboardNavigation = useCallback(
    (event: KeyboardEvent) => {
      if (!keyboardNavigation) return;

      const { focusableElements, currentFocusIndex } = state;
      if (focusableElements.length === 0) return;

      let newIndex = currentFocusIndex;

      switch (event.key) {
        case 'Tab':
          // Permitir navegación normal con Tab
          return;
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          newIndex = (currentFocusIndex + 1) % focusableElements.length;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          newIndex =
            currentFocusIndex === 0
              ? focusableElements.length - 1
              : currentFocusIndex - 1;
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = focusableElements.length - 1;
          break;
        case 'Escape': {
          event.preventDefault();
          // Cerrar modales o menús
          const closeEvent = new CustomEvent('closeModal');
          document.dispatchEvent(closeEvent);
          break;
        }
        default:
          return;
      }

      focusableElements[newIndex]?.focus();
      setState((prev) => ({ ...prev, currentFocusIndex: newIndex }));
    },
    [keyboardNavigation, state]
  );

  // Efectos
  useEffect(() => {
    if (manageFocus) {
      manageFocusTrap();
    }
  }, [manageFocus, manageFocusTrap]);

  useEffect(() => {
    if (keyboardNavigation) {
      document.addEventListener('keydown', handleKeyboardNavigation);
      return () => {
        document.removeEventListener('keydown', handleKeyboardNavigation);
      };
    }
  }, [keyboardNavigation, handleKeyboardNavigation]);

  // Utilidades adicionales
  const skipToContent = useCallback(() => {
    const mainContent =
      document.querySelector('main') || document.querySelector('#main-content');
    if (mainContent) {
      (mainContent as HTMLElement).focus();
      announce('Saltando al contenido principal');
    }
  }, [announce]);

  const toggleHighContrast = useCallback(() => {
    const root = document.documentElement;
    const isHighContrast = root.classList.contains('high-contrast');

    if (isHighContrast) {
      root.classList.remove('high-contrast');
      announce('Modo de alto contraste desactivado');
    } else {
      root.classList.add('high-contrast');
      announce('Modo de alto contraste activado');
    }
  }, [announce]);

  const increaseFontSize = useCallback(() => {
    const root = document.documentElement;
    const currentSize = parseInt(getComputedStyle(root).fontSize) || 16;
    const newSize = Math.min(currentSize + 2, 24);
    root.style.fontSize = `${newSize}px`;
    announce(`Tamaño de fuente aumentado a ${newSize}px`);
  }, [announce]);

  const decreaseFontSize = useCallback(() => {
    const root = document.documentElement;
    const currentSize = parseInt(getComputedStyle(root).fontSize) || 16;
    const newSize = Math.max(currentSize - 2, 12);
    root.style.fontSize = `${newSize}px`;
    announce(`Tamaño de fuente reducido a ${newSize}px`);
  }, [announce]);

  return {
    // Estado
    isAnnouncing: state.isAnnouncing,
    focusableElements: state.focusableElements,
    currentFocusIndex: state.currentFocusIndex,

    // Referencias
    liveRegionRef,
    focusTrapRef,

    // Funciones
    announce,
    manageFocusTrap,
    skipToContent,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
  };
};

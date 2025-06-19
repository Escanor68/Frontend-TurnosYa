import React, { createContext, ReactNode } from 'react';
import { useAccessibility } from '../../hooks/useAccessibility';

interface AccessibilityContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  skipToContent: () => void;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  isAnnouncing: boolean;
}

export const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
}) => {
  const {
    announce,
    skipToContent,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    isAnnouncing,
    liveRegionRef,
  } = useAccessibility({
    announceChanges: true,
    manageFocus: true,
    keyboardNavigation: true,
  });

  const value: AccessibilityContextType = {
    announce,
    skipToContent,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    isAnnouncing,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}

      {/* Región en vivo para anuncios de pantalla */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      />

      {/* Skip link para navegación por teclado */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
        onClick={(e) => {
          e.preventDefault();
          skipToContent();
        }}
      >
        Saltar al contenido principal
      </a>
    </AccessibilityContext.Provider>
  );
};

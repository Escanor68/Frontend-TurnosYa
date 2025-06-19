import React, { useState } from 'react';
import { useAccessibilityContext } from '../../hooks/useAccessibilityContext';
import { Button } from '../ui/Button';

interface AccessibilityControlsProps {
  className?: string;
}

export const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({
  className = '',
}) => {
  const { toggleHighContrast, increaseFontSize, decreaseFontSize, announce } =
    useAccessibilityContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    announce(
      isOpen
        ? 'Controles de accesibilidad cerrados'
        : 'Controles de accesibilidad abiertos'
    );
  };

  const handleHighContrast = () => {
    toggleHighContrast();
  };

  const handleIncreaseFont = () => {
    increaseFontSize();
  };

  const handleDecreaseFont = () => {
    decreaseFontSize();
  };

  return (
    <div className={`accessibility-controls ${className}`}>
      {/* Botón principal */}
      <Button
        onClick={handleToggle}
        variant="secondary"
        size="sm"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        aria-label="Controles de accesibilidad"
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 flex items-center justify-center"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </Button>

      {/* Panel de controles */}
      {isOpen && (
        <div
          id="accessibility-panel"
          className="fixed bottom-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-64"
          role="dialog"
          aria-label="Panel de controles de accesibilidad"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Accesibilidad
            </h3>

            {/* Contraste alto */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={handleHighContrast}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  aria-describedby="high-contrast-description"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Alto contraste
                </span>
              </label>
              <p
                id="high-contrast-description"
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Mejora el contraste para mejor visibilidad
              </p>
            </div>

            {/* Tamaño de fuente */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tamaño de fuente
              </label>
              <div className="flex space-x-2">
                <Button
                  onClick={handleDecreaseFont}
                  variant="outline"
                  size="sm"
                  aria-label="Reducir tamaño de fuente"
                  className="flex-1"
                >
                  A-
                </Button>
                <Button
                  onClick={handleIncreaseFont}
                  variant="outline"
                  size="sm"
                  aria-label="Aumentar tamaño de fuente"
                  className="flex-1"
                >
                  A+
                </Button>
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Navegación rápida
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    document.querySelector('main')?.focus();
                    announce('Saltando al contenido principal');
                  }}
                  className="block w-full text-left text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Saltar al contenido
                </button>
                <button
                  onClick={() => {
                    document.querySelector('nav')?.focus();
                    announce('Saltando a la navegación');
                  }}
                  className="block w-full text-left text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Saltar a navegación
                </button>
              </div>
            </div>

            {/* Información de teclas */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Atajos de teclado
              </h4>
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                    Tab
                  </kbd>{' '}
                  Navegar
                </p>
                <p>
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                    Enter
                  </kbd>{' '}
                  Activar
                </p>
                <p>
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                    Escape
                  </kbd>{' '}
                  Cerrar
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useI18n, useLanguageDetection } from '../../hooks/useI18n';
import { SupportedLanguage } from '../../config/i18n';
import { Button } from '../ui/Button';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'dropdown' | 'buttons';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  variant = 'dropdown',
}) => {
  const { t, language, setLanguage, supportedLanguages } = useI18n();
  const detectedLanguage = useLanguageDetection();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as SupportedLanguage);
    setIsOpen(false);
  };

  const currentLanguage = supportedLanguages[language];

  if (variant === 'buttons') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {Object.entries(supportedLanguages).map(([code, lang]) => (
          <Button
            key={code}
            onClick={() => handleLanguageChange(code)}
            variant={language === code ? 'primary' : 'outline'}
            size="sm"
            className="flex items-center space-x-1"
            aria-label={`Cambiar idioma a ${lang.name}`}
          >
            <span>{lang.flag}</span>
            <span className="hidden sm:inline">{lang.name}</span>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Seleccionar idioma"
      >
        <span>{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          role="menu"
          aria-label="Idiomas disponibles"
        >
          {Object.entries(supportedLanguages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                language === code
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              role="menuitem"
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              {code === detectedLanguage && (
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                  {t('nav.detected')}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay para cerrar el dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

// Componente para mostrar el idioma actual
export const CurrentLanguage: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const { language, supportedLanguages } = useI18n();
  const currentLanguage = supportedLanguages[language];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span>{currentLanguage.flag}</span>
      <span className="text-sm font-medium">{currentLanguage.name}</span>
    </div>
  );
};

// Componente para mostrar información de idioma
export const LanguageInfo: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const { language, supportedLanguages, isRTL } = useI18n();
  const currentLanguage = supportedLanguages[language];

  return (
    <div className={`text-xs text-gray-500 dark:text-gray-400 ${className}`}>
      <div>Idioma: {currentLanguage.name}</div>
      <div>Dirección: {isRTL ? 'RTL' : 'LTR'}</div>
      <div>Código: {currentLanguage.code}</div>
    </div>
  );
};

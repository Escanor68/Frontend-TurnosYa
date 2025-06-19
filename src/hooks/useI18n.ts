import { useCallback, useMemo } from 'react';
import {
  TRANSLATIONS,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
} from '../config/i18n';

interface UseI18nOptions {
  language?: SupportedLanguage;
  fallbackLanguage?: SupportedLanguage;
}

interface I18nContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
  isRTL: boolean;
}

export const useI18n = (options: UseI18nOptions = {}): I18nContext => {
  const { language = 'es', fallbackLanguage = 'es' } = options;

  // Función de traducción con interpolación
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      // Obtener la traducción del idioma actual
      let translation = getNestedValue(TRANSLATIONS[language], key);

      // Si no existe, usar el idioma de respaldo
      if (!translation && language !== fallbackLanguage) {
        translation = getNestedValue(TRANSLATIONS[fallbackLanguage], key);
      }

      // Si aún no existe, devolver la clave
      if (!translation) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }

      // Interpolar parámetros
      if (params) {
        return Object.entries(params).reduce(
          (result, [param, value]) =>
            result.replace(new RegExp(`{${param}}`, 'g'), String(value)),
          translation
        );
      }

      return translation;
    },
    [language, fallbackLanguage]
  );

  // Función para obtener valor anidado
  const getNestedValue = (
    obj: Record<string, unknown>,
    path: string
  ): string | undefined => {
    return path.split('.').reduce((current, key) => {
      return current &&
        typeof current === 'object' &&
        current[key] !== undefined
        ? (current[key] as string | undefined)
        : undefined;
    }, obj as unknown as string | undefined);
  };

  // Función para cambiar idioma
  const setLanguage = useCallback((newLanguage: SupportedLanguage) => {
    // En una implementación real, esto guardaría en localStorage
    // y actualizaría el estado global
    localStorage.setItem('preferred-language', newLanguage);
    window.location.reload(); // Simplificado para este ejemplo
  }, []);

  // Verificar si el idioma es RTL
  const isRTL = useMemo(() => {
    // Actualmente todos los idiomas soportados son LTR
    // En el futuro, cuando se agreguen idiomas RTL, esta lógica se actualizará
    return false;
  }, []);

  return {
    t,
    language,
    setLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isRTL,
  };
};

// Hook para detectar el idioma del navegador
export const useLanguageDetection = (): SupportedLanguage => {
  return useMemo(() => {
    // Obtener idioma guardado
    const savedLanguage = localStorage.getItem(
      'preferred-language'
    ) as SupportedLanguage;
    if (savedLanguage && savedLanguage in SUPPORTED_LANGUAGES) {
      return savedLanguage;
    }

    // Detectar idioma del navegador
    const browserLanguage = navigator.language.split(
      '-'
    )[0] as SupportedLanguage;
    if (browserLanguage in SUPPORTED_LANGUAGES) {
      return browserLanguage;
    }

    // Idioma por defecto
    return 'es';
  }, []);
};

// Hook para formatear fechas según el idioma
export const useDateFormat = (language: SupportedLanguage) => {
  return useCallback(
    (date: Date, options?: Intl.DateTimeFormatOptions): string => {
      const locale =
        language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : 'pt-BR';

      const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options,
      };

      return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
    },
    [language]
  );
};

// Hook para formatear números según el idioma
export const useNumberFormat = (language: SupportedLanguage) => {
  return useCallback(
    (number: number, options?: Intl.NumberFormatOptions): string => {
      const locale =
        language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : 'pt-BR';

      const defaultOptions: Intl.NumberFormatOptions = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        ...options,
      };

      return new Intl.NumberFormat(locale, defaultOptions).format(number);
    },
    [language]
  );
};

// Hook para formatear moneda según el idioma
export const useCurrencyFormat = (language: SupportedLanguage) => {
  return useCallback(
    (
      amount: number,
      currency: string = 'USD',
      options?: Intl.NumberFormatOptions
    ): string => {
      const locale =
        language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : 'pt-BR';

      const defaultOptions: Intl.NumberFormatOptions = {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...options,
      };

      return new Intl.NumberFormat(locale, defaultOptions).format(amount);
    },
    [language]
  );
};

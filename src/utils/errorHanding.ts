import axios from 'axios';
import { toast } from 'react-toastify';

// Utilidades para manejo de errores

/**
 * Función para manejar errores de forma centralizada
 * @param error Error capturado
 * @param context Contexto donde ocurrió el error
 */
export const handleError = (error: unknown, context: string): string => {
  console.error(`Error en ${context}:`, error)

  // Determinar el mensaje de error basado en el tipo de error
  if (error instanceof Error) {
    return error.message
  } else if (typeof error === "string") {
    return error
  } else {
    return "Ha ocurrido un error inesperado"
  }
}

/**
 * Función para enviar errores a un servicio de monitoreo (simulado)
 * @param error Error capturado
 * @param context Contexto donde ocurrió el error
 * @param metadata Metadatos adicionales
 */
export const logErrorToService = (error: unknown, context: string, metadata?: Record<string, any>): void => {
  // En una aplicación real, aquí enviarías el error a un servicio como Sentry, LogRocket, etc.
  console.error("ERROR LOG:", {
    timestamp: new Date().toISOString(),
    context,
    error:
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error,
    metadata,
  })
}

/**
 * HOC para envolver funciones y capturar errores
 * @param fn Función a envolver
 * @param context Contexto para el registro de errores
 */
export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  context: string,
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    try {
      return fn(...args)
    } catch (error) {
      handleError(error, context)
      logErrorToService(error, context, { args })
      throw error // Re-lanzar para que pueda ser manejado más arriba si es necesario
    }
  }
}

/**
 * Maneja errores de API de forma consistente
 * @param error Error de la API
 * @returns Mensaje de error formateado
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || 'Ha ocurrido un error en la comunicación con el servidor';
    toast.error(message);
    return message;
  }
  const defaultMessage = 'Ha ocurrido un error inesperado';
  toast.error(defaultMessage);
  return defaultMessage;
};
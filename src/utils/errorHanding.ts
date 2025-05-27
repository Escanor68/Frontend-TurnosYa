import { toast } from 'react-toastify';

interface ErrorMetadata {
  componentStack?: string;
  timestamp?: string;
  [key: string]: any;
}

export const logErrorToService = (error: Error, context: string, metadata?: ErrorMetadata): void => {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error("ERROR LOG:", {
      timestamp: metadata?.timestamp || new Date().toISOString(),
      context,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      metadata,
    });
  }

  // In production, you would send this to your error tracking service
  // Example: Sentry, LogRocket, etc.
  
  // Show a user-friendly toast message
  toast.error('Ha ocurrido un error inesperado. Por favor, intenta de nuevo.');
};

export const handleApiError = (error: unknown): string => {
  let message = 'Ha ocurrido un error inesperado';

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  toast.error(message);
  return message;
};
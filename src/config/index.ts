// API Configuration
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const FOOTBALL_API_URL =
  import.meta.env.VITE_FOOTBALL_API_URL || 'http://localhost:3001';
export const MERCADOPAGO_API_URL =
  import.meta.env.VITE_MERCADOPAGO_API_URL || 'https://api.mercadopago.com';

// App Configuration
export const APP_NAME = 'TurnosYa';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Plataforma de reservas de canchas deportivas';

// Toast Configuration
export const TOAST_CONFIG = {
  position: 'top-right' as const,
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light' as const,
};

// Pagination Configuration
export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
};

// Date Configuration
export const DATE_CONFIG = {
  format: 'dd/MM/yyyy',
  timeFormat: 'HH:mm',
  locale: 'es-ES',
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxFiles: 5,
};

// Payment Configuration
export const PAYMENT_CONFIG = {
  currency: 'ARS',
  paymentMethods: ['credit_card', 'debit_card', 'bank_transfer', 'cash'],
  installments: [1, 3, 6, 12],
};

// Booking Configuration
export const BOOKING_CONFIG = {
  minAdvanceHours: 1,
  maxAdvanceDays: 30,
  cancellationHours: 24,
  recurrenceOptions: ['none', 'weekly', 'biweekly', 'monthly'],
  maxRecurrenceCount: 12,
};

// Theme Configuration
export const THEME_CONFIG = {
  defaultTheme: 'light',
  themes: ['light', 'dark', 'system'],
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    'Error de conexión. Por favor, verifica tu conexión a internet.',
  UNAUTHORIZED: 'No tienes permisos para acceder a este recurso.',
  FORBIDDEN: 'Acceso denegado.',
  NOT_FOUND: 'El recurso solicitado no fue encontrado.',
  VALIDATION_ERROR: 'Por favor, verifica los datos ingresados.',
  SERVER_ERROR: 'Error del servidor. Por favor, intenta más tarde.',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  BOOKING_CREATED: 'Reserva creada exitosamente.',
  BOOKING_UPDATED: 'Reserva actualizada exitosamente.',
  BOOKING_CANCELLED: 'Reserva cancelada exitosamente.',
  PAYMENT_SUCCESS: 'Pago procesado exitosamente.',
  PROFILE_UPDATED: 'Perfil actualizado exitosamente.',
  PASSWORD_CHANGED: 'Contraseña cambiada exitosamente.',
  EMAIL_SENT: 'Email enviado exitosamente.',
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 254,
  PHONE_MAX_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 500,
  ADDRESS_MAX_LENGTH: 200,
};

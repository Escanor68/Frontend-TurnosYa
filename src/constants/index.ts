// Constantes de la aplicación
export const APP_CONSTANTS = {
  NAME: 'TurnosYa',
  VERSION: '1.0.0',
  DESCRIPTION: 'Plataforma de reservas de canchas deportivas',
  AUTHOR: 'TurnosYa Team',
  WEBSITE: 'https://turnosya.com',
  SUPPORT_EMAIL: 'soporte@turnosya.com',
} as const;

// Constantes de deportes
export const SPORTS = {
  FOOTBALL: 'football',
  PADEL: 'padel',
  TENNIS: 'tennis',
  BASKETBALL: 'basketball',
  VOLLEYBALL: 'volleyball',
} as const;

export const SPORT_NAMES = {
  [SPORTS.FOOTBALL]: 'Fútbol',
  [SPORTS.PADEL]: 'Pádel',
  [SPORTS.TENNIS]: 'Tenis',
  [SPORTS.BASKETBALL]: 'Básquet',
  [SPORTS.VOLLEYBALL]: 'Vóley',
} as const;

// Constantes de roles de usuario
export const USER_ROLES = {
  ADMIN: 'admin',
  OWNER: 'owner',
  PLAYER: 'player',
} as const;

export const ROLE_NAMES = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.OWNER]: 'Propietario',
  [USER_ROLES.PLAYER]: 'Jugador',
} as const;

// Constantes de estados de reserva
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  NO_SHOW: 'no_show',
} as const;

export const BOOKING_STATUS_NAMES = {
  [BOOKING_STATUS.PENDING]: 'Pendiente',
  [BOOKING_STATUS.CONFIRMED]: 'Confirmada',
  [BOOKING_STATUS.CANCELLED]: 'Cancelada',
  [BOOKING_STATUS.COMPLETED]: 'Completada',
  [BOOKING_STATUS.NO_SHOW]: 'No asistió',
} as const;

// Constantes de estados de pago
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS_NAMES = {
  [PAYMENT_STATUS.PENDING]: 'Pendiente',
  [PAYMENT_STATUS.PAID]: 'Pagado',
  [PAYMENT_STATUS.FAILED]: 'Fallido',
  [PAYMENT_STATUS.REFUNDED]: 'Reembolsado',
  [PAYMENT_STATUS.CANCELLED]: 'Cancelado',
} as const;

// Constantes de métodos de pago
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  BANK_TRANSFER: 'bank_transfer',
  CASH: 'cash',
  MERCADOPAGO: 'mercadopago',
} as const;

export const PAYMENT_METHOD_NAMES = {
  [PAYMENT_METHODS.CREDIT_CARD]: 'Tarjeta de Crédito',
  [PAYMENT_METHODS.DEBIT_CARD]: 'Tarjeta de Débito',
  [PAYMENT_METHODS.BANK_TRANSFER]: 'Transferencia Bancaria',
  [PAYMENT_METHODS.CASH]: 'Efectivo',
  [PAYMENT_METHODS.MERCADOPAGO]: 'Mercado Pago',
} as const;

// Constantes de tipos de cancha
export const FIELD_TYPES = {
  GRASS: 'grass',
  SYNTHETIC: 'synthetic',
  CLAY: 'clay',
  HARD: 'hard',
  CARPET: 'carpet',
} as const;

export const FIELD_TYPE_NAMES = {
  [FIELD_TYPES.GRASS]: 'Césped',
  [FIELD_TYPES.SYNTHETIC]: 'Sintético',
  [FIELD_TYPES.CLAY]: 'Polvo de Ladrillo',
  [FIELD_TYPES.HARD]: 'Dura',
  [FIELD_TYPES.CARPET]: 'Carpeta',
} as const;

// Constantes de servicios adicionales
export const ADDITIONAL_SERVICES = {
  EQUIPMENT_RENTAL: 'equipment_rental',
  COACHING: 'coaching',
  LOCKER_ROOM: 'locker_room',
  PARKING: 'parking',
  SHOWER: 'shower',
  BAR: 'bar',
} as const;

export const SERVICE_NAMES = {
  [ADDITIONAL_SERVICES.EQUIPMENT_RENTAL]: 'Alquiler de Equipamiento',
  [ADDITIONAL_SERVICES.COACHING]: 'Entrenamiento',
  [ADDITIONAL_SERVICES.LOCKER_ROOM]: 'Vestuario',
  [ADDITIONAL_SERVICES.PARKING]: 'Estacionamiento',
  [ADDITIONAL_SERVICES.SHOWER]: 'Ducha',
  [ADDITIONAL_SERVICES.BAR]: 'Bar',
} as const;

// Constantes de recurrencia
export const RECURRENCE_TYPES = {
  NONE: 'none',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
} as const;

export const RECURRENCE_NAMES = {
  [RECURRENCE_TYPES.NONE]: 'Sin recurrencia',
  [RECURRENCE_TYPES.WEEKLY]: 'Semanal',
  [RECURRENCE_TYPES.BIWEEKLY]: 'Quincenal',
  [RECURRENCE_TYPES.MONTHLY]: 'Mensual',
} as const;

// Constantes de notificaciones
export const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMED: 'booking_confirmed',
  BOOKING_CANCELLED: 'booking_cancelled',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  REMINDER: 'reminder',
  SYSTEM: 'system',
} as const;

export const NOTIFICATION_TYPE_NAMES = {
  [NOTIFICATION_TYPES.BOOKING_CONFIRMED]: 'Reserva Confirmada',
  [NOTIFICATION_TYPES.BOOKING_CANCELLED]: 'Reserva Cancelada',
  [NOTIFICATION_TYPES.PAYMENT_SUCCESS]: 'Pago Exitoso',
  [NOTIFICATION_TYPES.PAYMENT_FAILED]: 'Pago Fallido',
  [NOTIFICATION_TYPES.REMINDER]: 'Recordatorio',
  [NOTIFICATION_TYPES.SYSTEM]: 'Sistema',
} as const;

// Constantes de días de la semana
export const DAYS_OF_WEEK = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
  SUNDAY: 'sunday',
} as const;

export const DAY_NAMES = {
  [DAYS_OF_WEEK.MONDAY]: 'Lunes',
  [DAYS_OF_WEEK.TUESDAY]: 'Martes',
  [DAYS_OF_WEEK.WEDNESDAY]: 'Miércoles',
  [DAYS_OF_WEEK.THURSDAY]: 'Jueves',
  [DAYS_OF_WEEK.FRIDAY]: 'Viernes',
  [DAYS_OF_WEEK.SATURDAY]: 'Sábado',
  [DAYS_OF_WEEK.SUNDAY]: 'Domingo',
} as const;

// Constantes de horarios
export const TIME_SLOTS = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
  NIGHT: 'night',
} as const;

export const TIME_SLOT_NAMES = {
  [TIME_SLOTS.MORNING]: 'Mañana',
  [TIME_SLOTS.AFTERNOON]: 'Tarde',
  [TIME_SLOTS.EVENING]: 'Noche',
  [TIME_SLOTS.NIGHT]: 'Madrugada',
} as const;

// Constantes de límites
export const LIMITS = {
  MAX_BOOKINGS_PER_DAY: 5,
  MAX_PLAYERS_PER_BOOKING: 20,
  MIN_ADVANCE_BOOKING_HOURS: 1,
  MAX_ADVANCE_BOOKING_DAYS: 30,
  CANCELLATION_HOURS: 24,
  MAX_RECURRENCE_COUNT: 12,
  MAX_FILE_SIZE_MB: 5,
  MAX_FILES_PER_UPLOAD: 5,
} as const;

// Constantes de rutas
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  BOOKINGS: '/bookings',
  FIELDS: '/fields',
  ADMIN: '/admin',
  OWNER: '/owner',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;

// Constantes de API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    FAVORITES: '/users/favorite-fields',
  },
  FIELDS: {
    LIST: '/fields',
    DETAIL: '/fields/:id',
    CREATE: '/fields',
    UPDATE: '/fields/:id',
    DELETE: '/fields/:id',
    AVAILABILITY: '/fields/:id/availability',
  },
  BOOKINGS: {
    LIST: '/bookings',
    CREATE: '/bookings',
    UPDATE: '/bookings/:id',
    DELETE: '/bookings/:id',
    CANCEL: '/bookings/:id/cancel',
  },
  PAYMENTS: {
    CREATE: '/payments',
    PROCESS: '/payments/:id/process',
    STATUS: '/payments/:id/status',
    REFUND: '/payments/:id/refund',
    HISTORY: '/payments/history',
  },
} as const;

// Constantes de localStorage
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  NOTIFICATIONS: 'notifications',
} as const;

// Constantes de eventos
export const EVENTS = {
  BOOKING_CREATED: 'booking:created',
  BOOKING_UPDATED: 'booking:updated',
  BOOKING_CANCELLED: 'booking:cancelled',
  PAYMENT_SUCCESS: 'payment:success',
  PAYMENT_FAILED: 'payment:failed',
  USER_LOGIN: 'user:login',
  USER_LOGOUT: 'user:logout',
} as const;

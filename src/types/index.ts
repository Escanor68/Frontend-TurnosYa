// Archivo de exportación central para todos los tipos
// Esto facilita las importaciones en otros archivos

// Definición de tipos centralizados para toda la aplicación

// Tipos para autenticación
export interface AuthState {
  user: { id: string; email: string; name: string; role: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: { id: string; email: string; name: string; role: string };
  token: string;
}

// Tipos para campos deportivos
export interface SportField {
  id: string;
  name: string;
  type: string;
  price: number;
  duration: number;
  players: string;
  image: string;
  hasAdditionalServices: boolean;
  additionalServices?: AdditionalService[];
  location: Location;
  ownerId?: string;
  rating?: number;
  reviews?: Review[];
  amenities?: string[];
  description?: string;
}

export interface Location {
  address: string;
  city: string;
  province: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Tipos para servicios adicionales
export interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

// Tipos para validación de formularios
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Exportar tipos de rutas
export type { RouteConfig, BreadcrumbItem, NavigationItem } from './routes';

// Exportar tipos comunes (solo los que no tienen conflictos)
export type {
  ID,
  Timestamp,
  Status,
  SortOrder,
  PaginationParams,
  PaginatedResponse,
  FilterOperator,
  FilterCondition,
  FilterGroup,
  Filter,
  SearchParams,
  ApiError,
  FormField,
  FormConfig,
  ModalConfig,
  TableColumn,
  TableConfig,
  ChartData,
  ChartConfig,
  FileInfo,
  FileUploadConfig,
  Address,
  TimeSlot,
  Schedule,
  Statistic,
  AppConfig,
  AuditLog,
  Permission,
  Role,
  CacheConfig,
  CacheEntry,
  WebSocketMessage,
  WebSocketConfig,
} from './common';

// Exportar tipos de user
export type { User, LoginCredentials, RegisterData } from './user';

// Exportar tipos de booking
export type {
  BookingStatus,
  Booking,
  RecurrenceType,
  CreateBookingDTO,
  BookingFilters,
  BookingFormData,
  RecurrenceOption,
  BookingPayload,
  BookingResponse,
  BookingSearchParams,
} from './booking';

// Exportar tipos de sports
export type { Sport } from './sports';

// Exportar tipos de location
export type { Location as LocationType } from './location';

// Exportar tipos de payment
export type {
  PaymentMethod,
  PaymentStatus,
  Transaction,
  Payment,
  PaymentDetails,
  PaymentPreference,
  PaymentReport,
  Invoice,
  InvoiceItem,
  RefundRequest,
  Customer,
  PaymentResponse,
} from './payment';

// Exportar tipos de notification
export type { Notification as NotificationType } from './notification';

// Exportar tipos de api
export type { ApiResponse, ErrorResponse } from './api';

// Exportar tipos de field
export type {
  Field,
  FieldAvailability,
  FieldReview,
  FieldStatistics,
  FieldSearchParams,
  SpecialHours,
} from './field';

// Exportar tipos de team
export type { Team, TeamMember, Match } from './team';

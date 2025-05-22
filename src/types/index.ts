// Archivo de exportación central para todos los tipos
// Esto facilita las importaciones en otros archivos

export * from './users';
export * from './booking';
export * from './payment';
export * from './sports';
export * from './validation';
export * from './location';
import type React from 'react';
// Definición de tipos centralizados para toda la aplicación

// Tipos para usuarios
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'owner' | 'user';
  avatar?: string;
}

// Tipos para autenticación
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'owner' | 'user';
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

// Tipos para reservas
export interface Booking {
  id: string;
  fieldId: string;
  userId: string;
  date: string;
  time: string;
  players: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  recurrence: string;
  recurrenceCount: number;
  additionalServices: string[];
  additionalServicesNotes?: string;
  recurrenceExceptions: string[];
  createdAt: string;
}

export interface BookingFormData {
  fieldId: string;
  userId: string;
  date: string;
  time: string;
  players: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cardholderName: string;
  };
  termsAccepted: boolean;
  recurrence: string;
  recurrenceCount: number;
  additionalServices: string[];
  additionalServicesNotes: string;
  recurrenceExceptions: string[];
  price: number;
}

// Tipos para servicios adicionales
export interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

// Tipos para opciones de recurrencia
export interface RecurrenceOption {
  id: string;
  name: string;
  discount: number;
}

// Tipos para métodos de pago
export interface PaymentMethod {
  id: string;
  name: string;
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

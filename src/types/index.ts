// Archivo de exportación central para todos los tipos
// Esto facilita las importaciones en otros archivos

export * from './routes';
export * from './common';
export * from './booking';
export * from './sports';
export * from './location';
export * from './payment';
export * from './user';
export * from './notification';
export * from './api';
export * from './field';

import type React from 'react';
import type { PaymentMethod } from './payment';

// Definición de tipos centralizados para toda la aplicación

// Tipos para autenticación
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'owner' | 'user';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'owner' | 'user';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface PasswordResetData {
  email: string;
}

export interface PasswordResetConfirmData {
  token: string;
  password: string;
  confirmPassword: string;
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
  paymentMethod: PaymentMethod;
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
  paymentMethod: PaymentMethod;
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
  icon: string;
}

// Tipos para opciones de recurrencia
export interface RecurrenceOption {
  id: string;
  name: string;
  discount: number;
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

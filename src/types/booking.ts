// Tipos relacionados con reservas

import type { Field } from './field';
import type { PaymentMethod, PaymentStatus } from './payment';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id: string;
  fieldId: string;
  field: Field;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  totalPrice: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  recurrence?: string;
  recurrenceCount?: number;
  additionalServices?: string[];
  additionalServicesNotes?: string;
  recurrenceExceptions?: string[];
  createdAt: string;
  updatedAt: string;
}

export type RecurrenceType = 'daily' | 'weekly' | 'monthly';

export interface CreateBookingDTO {
  fieldId: string;
  date: string;
  startTime: string;
  endTime: string;
  recurrence?: {
    type: 'weekly' | 'monthly';
    endDate: string;
  };
}

export interface BookingFilters {
  startDate?: string;
  endDate?: string;
  status?: BookingStatus;
  fieldId?: string;
  userId?: string;
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
  status: BookingStatus;
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

export interface RecurrenceOption {
  id: string;
  name: string;
  discount: number;
}

export interface BookingPayload {
  fieldId: string;
  userId?: string;
  dates: Array<{
    date: string;
    time: string;
  }>;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  recurrence: {
    type: string;
    weekDay: number;
    count: number;
    exceptions: string[];
  };
  additionalServices: string[];
  additionalServicesNotes: string;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  deposit: number;
}

export interface BookingResponse {
  bookingId: string;
  status: string;
  message: string;
  checkoutUrl?: string;
}

export interface BookingSearchParams {
  fieldId?: string;
  userId?: string;
  date?: string;
  status?: BookingStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

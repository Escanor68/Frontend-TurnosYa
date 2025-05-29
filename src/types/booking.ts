// Tipos relacionados con reservas

import { Field } from './field';

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
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
export type PaymentStatus = 'pending' | 'partial' | 'completed' | 'refunded';

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
  userId?: string;
  fieldId?: string;
  date?: string;
  status?: BookingStatus;
}

export interface BookingFormData {
  date: string;
  time: string;
  players: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  paymentMethod: string;
  termsAccepted: boolean;
  recurrence: string;
  weekDay: number;
  recurrenceCount: number;
  additionalServices: string[];
  additionalServicesNotes: string;
  recurrenceExceptions: string[];
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
  paymentMethod: string;
  totalPrice: number;
  deposit: number;
}

export interface BookingResponse {
  bookingId: string;
  status: string;
  message: string;
  checkoutUrl?: string;
}

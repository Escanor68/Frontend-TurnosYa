import api from './api';
import { ApiResponse, Booking } from '../types/api';

export interface CreateBookingData {
  fieldId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export const bookingsService = {
  getBookings: async () => {
    const response = await api.get<ApiResponse<Booking[]>>('/bookings');
    return response.data.data;
  },

  getUserBookings: async () => {
    const response = await api.get<ApiResponse<Booking[]>>('/bookings/user');
    return response.data.data;
  },

  getBooking: async (id: string) => {
    const response = await api.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return response.data.data;
  },

  createBooking: async (bookingData: CreateBookingData) => {
    const response = await api.post<ApiResponse<Booking>>(
      '/bookings',
      bookingData
    );
    return response.data.data;
  },

  cancelBooking: async (id: string) => {
    const response = await api.patch<ApiResponse<Booking>>(
      `/bookings/${id}/cancel`
    );
    return response.data.data;
  },

  // Para administradores y dueños de canchas
  confirmBooking: async (id: string) => {
    const response = await api.patch<ApiResponse<Booking>>(
      `/bookings/${id}/confirm`
    );
    return response.data.data;
  },

  // Para administradores y dueños de canchas
  getFieldBookings: async (fieldId: string) => {
    const response = await api.get<ApiResponse<Booking[]>>(
      `/bookings/field/${fieldId}`
    );
    return response.data.data;
  },
};

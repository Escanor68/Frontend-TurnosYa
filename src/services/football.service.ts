import { footballApi } from '../lib/axios';
import { Field, FieldAvailability, FieldFilters } from '../types/field';
import { Booking, CreateBookingDTO, BookingFilters } from '../types/booking';

export const footballService = {
  // Campos/Canchas
  getFields: () => footballApi.get<Field[]>('/fields').then((res) => res.data),

  getFieldById: (id: string) =>
    footballApi.get<Field>(`/fields/${id}`).then((res) => res.data),

  getNearbyFields: (lat: number, lng: number, radius: number) =>
    footballApi
      .get<Field[]>(`/fields/nearby`, {
        params: { lat, lng, radius },
      })
      .then((res) => res.data),

  searchFields: (filters: FieldFilters) =>
    footballApi
      .get<Field[]>('/fields/search', {
        params: filters,
      })
      .then((res) => res.data),

  // Disponibilidad
  checkFieldAvailability: (fieldId: string, date: string) =>
    footballApi
      .get<FieldAvailability[]>(`/fields/${fieldId}/availability`, {
        params: { date },
      })
      .then((res) => res.data),

  // Reservas
  createBooking: (bookingData: CreateBookingDTO) =>
    footballApi.post<Booking>('/bookings', bookingData).then((res) => res.data),

  getBookings: (filters?: BookingFilters) =>
    footballApi
      .get<Booking[]>('/bookings', {
        params: filters,
      })
      .then((res) => res.data),

  getBookingById: (id: string) =>
    footballApi.get<Booking>(`/bookings/${id}`).then((res) => res.data),

  cancelBooking: (id: string) =>
    footballApi.delete<Booking>(`/bookings/${id}`).then((res) => res.data),

  // Reviews
  getFieldReviews: (fieldId: string) =>
    footballApi.get(`/fields/${fieldId}/reviews`).then((res) => res.data),

  addFieldReview: (
    fieldId: string,
    review: { rating: number; comment: string }
  ) =>
    footballApi
      .post(`/fields/${fieldId}/reviews`, review)
      .then((res) => res.data),

  // Horarios Especiales
  getSpecialHours: (fieldId: string) =>
    footballApi.get(`/fields/${fieldId}/special-hours`).then((res) => res.data),
};

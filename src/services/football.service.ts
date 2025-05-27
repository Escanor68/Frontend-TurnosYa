import footballApi from './api/football.api';
import { Field, Booking } from '../types';

export const footballService = {
  // Fields
  getFields: () => footballApi.get('/fields'),
  getFieldById: (id: string) => footballApi.get(`/fields/${id}`),
  getNearbyFields: (lat: number, lng: number, radius: number) => 
    footballApi.get(`/fields/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
  
  // Bookings
  createBooking: (booking: Partial<Booking>) => footballApi.post('/bookings', booking),
  getBookings: () => footballApi.get('/bookings'),
  getBookingById: (id: string) => footballApi.get(`/bookings/${id}`),
  cancelBooking: (id: string) => footballApi.delete(`/bookings/${id}`),
  
  // Field availability
  checkFieldAvailability: (fieldId: string, date: string) => 
    footballApi.get(`/fields/${fieldId}/availability?date=${date}`),
}; 
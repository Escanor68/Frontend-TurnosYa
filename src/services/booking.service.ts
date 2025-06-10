import { apiService } from './api';
import {
  Booking,
  BookingFormData,
  BookingSearchParams,
} from '../types/booking';

class BookingService {
  private static instance: BookingService;

  private constructor() {}

  public static getInstance(): BookingService {
    if (!BookingService.instance) {
      BookingService.instance = new BookingService();
    }
    return BookingService.instance;
  }

  public async getBookings(params?: BookingSearchParams): Promise<Booking[]> {
    const response = await apiService.get<Booking[]>('/bookings', { params });
    return response.data;
  }

  public async getBookingById(id: string): Promise<Booking> {
    const response = await apiService.get<Booking>(`/bookings/${id}`);
    return response.data;
  }

  public async createBooking(booking: BookingFormData): Promise<Booking> {
    const response = await apiService.post<Booking>('/bookings', booking);
    return response.data;
  }

  public async updateBooking(
    id: string,
    booking: Partial<Booking>
  ): Promise<Booking> {
    const response = await apiService.put<Booking>(`/bookings/${id}`, booking);
    return response.data;
  }

  public async deleteBooking(id: string): Promise<void> {
    await apiService.delete(`/bookings/${id}`);
  }

  public async cancelBooking(id: string): Promise<Booking> {
    const response = await apiService.put<Booking>(`/bookings/${id}/cancel`);
    return response.data;
  }

  public async getUserBookings(userId: string): Promise<Booking[]> {
    const response = await apiService.get<Booking[]>(
      `/bookings/user/${userId}`
    );
    return response.data;
  }

  public async getFieldBookings(fieldId: string): Promise<Booking[]> {
    const response = await apiService.get<Booking[]>(
      `/bookings/field/${fieldId}`
    );
    return response.data;
  }
}

export const bookingService = BookingService.getInstance();

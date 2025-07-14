import axios from 'axios';
import { FOOTBALL_API_URL } from '../config';

// Tipos específicos para el backend de fútbol
export interface FootballField {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerHour: number;
  surface: string;
  hasLighting: boolean;
  isIndoor: boolean;
  amenities: string[];
  ownerId: string;
  businessHours: BusinessHour[];
}

export interface BusinessHour {
  day: number;
  openTime: string;
  closeTime: string;
}

export interface Booking {
  id: number;
  fieldId: number;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  comments?: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingData {
  fieldId: number;
  date: string;
  startTime: string;
  endTime: string;
  comments?: string;
  processPayment?: boolean;
}

export interface FieldAvailability {
  date: string;
  availableSlots: string[];
  bookedSlots: string[];
}

export interface SpecialHour {
  id: number;
  fieldId: number;
  date: string;
  openingTime: string;
  closingTime: string;
  isClosed: boolean;
  specialPrice?: number;
}

export interface Review {
  id: number;
  fieldId: number;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface OwnerStatistics {
  totalFields: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
}

// Configuración del cliente axios para el backend de fútbol
const footballApi = axios.create({
  baseURL: FOOTBALL_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
footballApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
footballApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const footballService = {
  // Health checks
  health: async () => {
    const response = await footballApi.get('/health');
    return response.data;
  },

  healthReadiness: async () => {
    const response = await footballApi.get('/health/readiness');
    return response.data;
  },

  healthLiveness: async () => {
    const response = await footballApi.get('/health/liveness');
    return response.data;
  },

  healthPaymentService: async () => {
    const response = await footballApi.get('/health/payment-service');
    return response.data;
  },

  // Test endpoint para verificar autenticación
  testAuth: async () => {
    const response = await footballApi.get('/bookings/test');
    return response.data;
  },

  // Campos (públicos)
  getFields: async (): Promise<FootballField[]> => {
    const response = await footballApi.get('/fields');
    return response.data;
  },

  getFieldById: async (fieldId: number): Promise<FootballField> => {
    const response = await footballApi.get(`/fields/${fieldId}`);
    return response.data;
  },

  searchFields: async (
    query: string,
    city?: string
  ): Promise<FootballField[]> => {
    const params = new URLSearchParams({ q: query });
    if (city) params.append('city', city);
    const response = await footballApi.get(`/fields/search?${params}`);
    return response.data;
  },

  getNearbyFields: async (
    lat: number,
    lng: number,
    radius: number = 10
  ): Promise<FootballField[]> => {
    const response = await footballApi.get(
      `/fields/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
    );
    return response.data;
  },

  getFieldAvailability: async (
    fieldId: number,
    date: string
  ): Promise<FieldAvailability> => {
    const response = await footballApi.get(
      `/fields/${fieldId}/availability?date=${date}`
    );
    return response.data;
  },

  getFieldSpecialHours: async (fieldId: number): Promise<SpecialHour[]> => {
    const response = await footballApi.get(`/fields/${fieldId}/special-hours`);
    return response.data;
  },

  // Campos (autenticados - propietarios)
  getOwnerFields: async (ownerId: string): Promise<FootballField[]> => {
    const response = await footballApi.get(`/fields/owner/${ownerId}`);
    return response.data;
  },

  getOwnerStatistics: async (ownerId: string): Promise<OwnerStatistics> => {
    const response = await footballApi.get(
      `/fields/owner/${ownerId}/statistics`
    );
    return response.data;
  },

  createField: async (
    fieldData: Omit<FootballField, 'id'>
  ): Promise<FootballField> => {
    const response = await footballApi.post('/fields', fieldData);
    return response.data;
  },

  createSpecialHour: async (
    fieldId: number,
    specialHourData: Omit<SpecialHour, 'id' | 'fieldId'>
  ): Promise<SpecialHour> => {
    const response = await footballApi.post(
      `/fields/${fieldId}/special-hours`,
      specialHourData
    );
    return response.data;
  },

  // Reservas (autenticadas)
  getBookings: async (filters?: {
    userId?: string;
    fieldId?: number;
    date?: string;
  }): Promise<Booking[]> => {
    const params = new URLSearchParams();
    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.fieldId) params.append('fieldId', filters.fieldId.toString());
    if (filters?.date) params.append('date', filters.date);

    const response = await footballApi.get(`/bookings?${params}`);
    return response.data;
  },

  getBookingById: async (bookingId: number): Promise<Booking> => {
    const response = await footballApi.get(`/bookings/${bookingId}`);
    return response.data;
  },

  createBooking: async (bookingData: CreateBookingData): Promise<Booking> => {
    const response = await footballApi.post('/bookings', bookingData);
    return response.data;
  },

  cancelBooking: async (bookingId: number): Promise<void> => {
    await footballApi.delete(`/bookings/${bookingId}`);
  },

  // Reseñas
  createReview: async (
    fieldId: number,
    reviewData: {
      rating: number;
      comment: string;
      userId: string;
    }
  ): Promise<Review> => {
    const response = await footballApi.post(
      `/fields/${fieldId}/reviews`,
      reviewData
    );
    return response.data;
  },

  // Webhooks
  handlePaymentWebhook: async (webhookData: {
    type: string;
    data: {
      id: string;
      status: string;
      external_reference: string;
      amount: number;
    };
  }): Promise<void> => {
    await footballApi.post('/webhooks/payment', webhookData);
  },
};

export default footballService;

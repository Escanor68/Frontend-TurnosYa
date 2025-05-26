export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'owner';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends Omit<LoginCredentials, 'role'> {
  name: string;
  confirmPassword: string;
}

export interface Booking {
  id: string;
  fieldId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Field {
  id: string;
  name: string;
  description: string;
  type: 'football' | 'tennis' | 'basketball';
  price: number;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  images: string[];
  ownerId: string;
  availability: {
    days: number[];
    startTime: string;
    endTime: string;
  };
  createdAt: string;
  updatedAt: string;
} 
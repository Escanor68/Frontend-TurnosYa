import type { User } from './user';
import type { Booking } from './booking';
import type { Field } from './field';

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends Omit<LoginCredentials, 'role'> {
  name: string;
  confirmPassword: string;
}

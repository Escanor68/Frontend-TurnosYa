import usersApi from './api/users.api';
import { User, LoginCredentials, RegisterData } from '../types';

export const usersService = {
  // Authentication
  login: (credentials: LoginCredentials) => 
    usersApi.post('/auth/login', credentials),
  register: (data: RegisterData) => 
    usersApi.post('/auth/register', data),
  logout: () => usersApi.post('/auth/logout'),
  refreshToken: () => usersApi.post('/auth/refresh'),
  
  // User profile
  getCurrentUser: () => usersApi.get('/users/me'),
  updateProfile: (data: Partial<User>) => 
    usersApi.patch('/users/me', data),
  
  // User bookings
  getUserBookings: () => usersApi.get('/users/me/bookings'),
  getUserFavoriteFields: () => usersApi.get('/users/me/favorites'),
  addFieldToFavorites: (fieldId: string) => 
    usersApi.post(`/users/me/favorites/${fieldId}`),
  removeFieldFromFavorites: (fieldId: string) => 
    usersApi.delete(`/users/me/favorites/${fieldId}`),
}; 
import api from './api';
import { ApiResponse, User, LoginCredentials, RegisterData } from '../types/api';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<ApiResponse<{ user: User; token: string; refreshToken: string }>>(
      '/auth/login',
      credentials
    );
    const { token, refreshToken, user } = response.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  },

  register: async (userData: RegisterData) => {
    const response = await api.post<ApiResponse<{ user: User; token: string; refreshToken: string }>>(
      '/auth/register',
      userData
    );
    const { token, refreshToken, user } = response.data.data;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post<ApiResponse<{ token: string }>>(
      '/auth/refresh',
      { refreshToken }
    );
    const { token } = response.data.data;
    localStorage.setItem('token', token);
    return token;
  },

  getCurrentUser: async () => {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  }
}; 
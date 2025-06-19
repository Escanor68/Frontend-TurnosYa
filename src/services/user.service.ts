import axios from 'axios';
import type {
  User,
  RegisterData,
  LoginCredentials,
  PasswordResetData,
  PasswordResetConfirmData,
} from '../types/user';
import {
  UserProfile,
  UpdateProfileData,
  ChangePasswordData,
} from '../types/user';
import { Notification as UserNotification } from '../types/notification';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const userService = {
  // Registro y autenticación
  register: async (data: RegisterData): Promise<User> => {
    const response = await axios.post(`${API_URL}/users/register`, data);
    return response.data;
  },

  login: async (
    data: LoginCredentials
  ): Promise<{ user: User; token: string }> => {
    const response = await axios.post(`${API_URL}/users/login`, data);
    return response.data;
  },

  // Perfil de usuario
  getProfile: async (): Promise<UserProfile> => {
    const response = await axios.get(`${API_URL}/users/profile`);
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    const response = await axios.put(`${API_URL}/users/profile`, data);
    return response.data;
  },

  // Gestión de contraseña
  changePassword: async (data: ChangePasswordData): Promise<void> => {
    await axios.put(`${API_URL}/users/change-password`, data);
  },

  forgotPassword: async (data: PasswordResetData): Promise<void> => {
    await axios.post(`${API_URL}/users/forgot-password`, data);
  },

  resetPassword: async (data: PasswordResetConfirmData): Promise<void> => {
    await axios.post(`${API_URL}/users/reset-password`, data);
  },

  // Campos favoritos
  getFavoriteFields: async (): Promise<string[]> => {
    const response = await axios.get(`${API_URL}/users/favorite-fields`);
    return response.data;
  },

  addFavoriteField: async (fieldId: string): Promise<void> => {
    await axios.post(`${API_URL}/users/favorite-fields`, { fieldId });
  },

  removeFavoriteField: async (fieldId: string): Promise<void> => {
    await axios.delete(`${API_URL}/users/favorite-fields/${fieldId}`);
  },

  // Notificaciones
  getNotifications: async (): Promise<UserNotification[]> => {
    const response = await axios.get(`${API_URL}/users/notifications`);
    return response.data;
  },

  markNotificationAsRead: async (notificationId: string): Promise<void> => {
    await axios.put(`${API_URL}/users/notifications/${notificationId}/read`);
  },

  // Administración de usuarios (solo para admin)
  getAllUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  getUserById: async (userId: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  },

  updateUser: async (userId: string, data: Partial<User>): Promise<User> => {
    const response = await axios.put(`${API_URL}/users/${userId}`, data);
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await axios.delete(`${API_URL}/users/${userId}`);
  },
};

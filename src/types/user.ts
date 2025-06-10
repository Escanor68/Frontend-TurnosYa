import { Notification } from './notification';

export type UserRole = 'player' | 'owner' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  role: UserRole;
  points: number;
  createdAt: string;
  updatedAt: string;
  profileImage?: string;
}

export interface UserProfile extends User {
  favoriteFields: string[];
  notifications: Notification[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface PasswordResetData {
  email: string;
}

export interface PasswordResetConfirmData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  name?: string;
  surname?: string;
  phone?: string;
  profileImage?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

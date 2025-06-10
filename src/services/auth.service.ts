import { apiService } from './api';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  PasswordResetData,
  PasswordResetConfirmData,
} from '../types/user';

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      '/auth/login',
      credentials
    );
    if (response.data.token) {
      apiService.setToken(response.data.token);
    }
    return response.data;
  }

  public async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      '/auth/register',
      data
    );
    if (response.data.token) {
      apiService.setToken(response.data.token);
    }
    return response.data;
  }

  public async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } finally {
      apiService.clearToken();
    }
  }

  public async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>('/auth/me');
    return response.data;
  }

  public async requestPasswordReset(data: PasswordResetData): Promise<void> {
    await apiService.post('/auth/password-reset', data);
  }

  public async confirmPasswordReset(
    data: PasswordResetConfirmData
  ): Promise<void> {
    await apiService.post('/auth/password-reset/confirm', data);
  }

  public async verifyEmail(token: string): Promise<void> {
    await apiService.post('/auth/verify-email', { token });
  }

  public async resendVerificationEmail(email: string): Promise<void> {
    await apiService.post('/auth/resend-verification', { email });
  }

  public async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiService.put<User>('/auth/profile', data);
    return response.data;
  }

  public async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await apiService.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }
}

export const authService = AuthService.getInstance();

import axios from 'axios';
import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class AuthService {
  private setAuthHeader(token: string | null) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      this.setAuthHeader(token);
      const response = await axios.get<User>(`${API_URL}/auth/me`);
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      this.setAuthHeader(null);
      throw error;
    }
  }

  async login(
    credentials: LoginCredentials
  ): Promise<{ token: string; user: User }> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/login`,
        credentials
      );
      const { accessToken, user } = response.data;
      this.setAuthHeader(accessToken);
      return { token: accessToken, user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || 'Error al iniciar sesión'
        );
      }
      throw error;
    }
  }

  async register(data: RegisterData): Promise<{ token: string; user: User }> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/register`,
        data
      );
      const { accessToken, user } = response.data;
      this.setAuthHeader(accessToken);
      return { token: accessToken, user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Error al registrarse');
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } finally {
      localStorage.removeItem('token');
      this.setAuthHeader(null);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || 'Error al procesar la solicitud'
        );
      }
      throw error;
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/reset-password`, { token, password });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || 'Error al restablecer la contraseña'
        );
      }
      throw error;
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.post(`${API_URL}/auth/refresh-token`, {
      refreshToken,
    });

    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  }

  updateProfile(userId: string, data: Partial<User>): Promise<User> {
    // Implementation needed
    throw new Error('Method not implemented');
  }

  changePassword(oldPassword: string, newPassword: string): Promise<void> {
    // Implementation needed
    throw new Error('Method not implemented');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();

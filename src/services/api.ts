import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';
import { AuthTokens } from '../types/auth';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Función para obtener tokens del localStorage
const getStoredTokens = (): AuthTokens | null => {
  const tokens = localStorage.getItem('tokens');
  return tokens ? JSON.parse(tokens) : null;
};

// Función para guardar tokens en localStorage
export const setStoredTokens = (tokens: AuthTokens): void => {
  localStorage.setItem('tokens', JSON.stringify(tokens));
};

// Función para eliminar tokens del localStorage
export const removeStoredTokens = (): void => {
  localStorage.removeItem('tokens');
};

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const tokens = getStoredTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas y errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const tokens = getStoredTokens();
        if (!tokens?.refreshToken) {
          throw new Error('No refresh token available');
        }

        // Intentar refrescar el token
        const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
          refreshToken: tokens.refreshToken,
        });

        const newTokens: AuthTokens = response.data;
        setStoredTokens(newTokens);

        // Reintentar la petición original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, limpiar tokens y redirigir a login
        removeStoredTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    const errorMessage = error.response?.data?.message || 'Ha ocurrido un error';
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

export default api; 
import axios from 'axios';
import { BACKMP_API_URL } from '../../config/index';

const mercadoPagoApi = axios.create({
  baseURL: BACKMP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 segundos de timeout para operaciones de pago
});

// Interceptor para agregar token de autenticación
mercadoPagoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores específicos de BackMP
mercadoPagoApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    // Log específico para errores de BackMP
    if (error.response?.data?.message) {
      console.error('🚨 [BackMP] Error:', error.response.data.message);
    }

    return Promise.reject(error);
  }
);

export default mercadoPagoApi;

import axios from 'axios';

const mercadoPagoApi = axios.create({
  baseURL: import.meta.env.VITE_MERCADOPAGO_API_URL || 'http://localhost:3003',
  headers: {
    'Content-Type': 'application/json',
  },
});

mercadoPagoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default mercadoPagoApi; 
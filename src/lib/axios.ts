import axios from 'axios';

const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expirado o inválido
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      if (error.response?.status === 429) {
        // Rate limit alcanzado
        console.error('Rate limit reached');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const footballApi = createAxiosInstance(
  import.meta.env.VITE_FOOTBALL_API_URL
);
export const usersApi = createAxiosInstance(import.meta.env.VITE_USERS_API_URL);
export const paymentsApi = createAxiosInstance(
  import.meta.env.VITE_MERCADOPAGO_API_URL
);

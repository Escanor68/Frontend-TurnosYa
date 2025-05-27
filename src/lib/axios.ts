import axios from 'axios';
import toast from 'react-hot-toast';

// URL base de tus microservicios (ajustalas según el entorno)
const BASE_URLS = {
  usuarios: import.meta.env.VITE_API_USUARIOS || 'http://localhost:3001/api',
  futbol: import.meta.env.VITE_API_FUTBOL || 'http://localhost:3002/api',
  pagos: import.meta.env.VITE_API_PAGOS || 'http://localhost:3003/api',
};

// Crea instancias separadas para cada microservicio
export const axiosUsuarios = axios.create({
  baseURL: BASE_URLS.usuarios,
});

export const axiosFutbol = axios.create({
  baseURL: BASE_URLS.futbol,
});

export const axiosPagos = axios.create({
  baseURL: BASE_URLS.pagos,
});

// Función para inyectar token JWT automáticamente
const injectToken = (config: any) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Interceptor de request
const attachInterceptors = (instance: any) => {
  instance.interceptors.request.use(
    injectToken,
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Error desconocido';

      toast.error(message);
      return Promise.reject(error);
    }
  );
};

// Aplicar interceptores a cada instancia
[axiosUsuarios, axiosFutbol, axiosPagos].forEach(attachInterceptors);

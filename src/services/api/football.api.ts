import axios from 'axios';

const footballApi = axios.create({
  baseURL: import.meta.env.VITE_FOOTBALL_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

footballApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default footballApi;

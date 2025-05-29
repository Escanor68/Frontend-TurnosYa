import axios from 'axios';

const usersApi = axios.create({
  baseURL: import.meta.env.VITE_USERS_API_URL || 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json',
  },
});

usersApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default usersApi;

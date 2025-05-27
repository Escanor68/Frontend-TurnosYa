"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { User } from '../types/auth';
import { authService } from '../services/auth.service';

// Tipos
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar autenticación al cargar
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        await logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      toast.success(`¡Bienvenido, ${response.user.name}!`);

      // Redireccionar según el rol
      const from = location.state?.from?.pathname || getDefaultRoute(response.user.role);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Credenciales inválidas');
      toast.error('Email o contraseña incorrectos');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register({
        email,
        password,
        name,
        role,
      });
      setUser(response.user);
      toast.success('¡Registro exitoso!');
      navigate(getDefaultRoute(response.user.role));
    } catch (err) {
      setError('Error en el registro');
      toast.error('Error al registrar usuario');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      toast.info('Has cerrado sesión');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error al cerrar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultRoute = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'owner':
        return '/owner/courts';
      case 'player':
        return '/bookings';
      default:
        return '/';
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

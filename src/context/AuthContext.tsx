import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import type { User, AuthContextType } from '../types/auth';
import authService from '../services/auth.service';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => { throw new Error('AuthContext not initialized') },
  register: async () => { throw new Error('AuthContext not initialized') },
  logout: async () => { throw new Error('AuthContext not initialized') },
  forgotPassword: async () => { throw new Error('AuthContext not initialized') },
  resetPassword: async () => { throw new Error('AuthContext not initialized') },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const userData = await authService.getCurrentUser();
        if (mounted) {
          setUser(userData);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize auth'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { token, user: userData } = await authService.login({ email, password });
      localStorage.setItem('token', token);
      setUser(userData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.logout();
    } catch (err) {
      console.error('Error during logout:', err);
      const message = err instanceof Error ? err.message : 'Error al cerrar sesión';
      toast.error(message);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsLoading(false);
    }
  };

  const register = async (userData: { email: string; password: string; name: string; role: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      const { token, user: newUser } = await authService.register(userData);
      localStorage.setItem('token', token);
      setUser(newUser);
      toast.success('¡Registro exitoso!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      await authService.forgotPassword(email);
      toast.success('Se han enviado las instrucciones a tu email');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al procesar la solicitud';
      toast.error(message);
      throw err;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      setError(null);
      await authService.resetPassword(token, password);
      toast.success('Contraseña actualizada exitosamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al restablecer la contraseña';
      toast.error(message);
      throw err;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error; // Let ErrorBoundary handle it
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
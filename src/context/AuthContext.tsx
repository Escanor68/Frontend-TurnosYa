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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { token, user: userData } = await authService.login(email, password);
      localStorage.setItem('token', token);
      setUser(userData);
      toast.success('¡Bienvenido!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al iniciar sesión');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
      toast.success('¡Hasta pronto!');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error al cerrar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { email: string; password: string; name: string; role: string }) => {
    try {
      setIsLoading(true);
      const { token, user: newUser } = await authService.register(userData);
      localStorage.setItem('token', token);
      setUser(newUser);
      toast.success('¡Registro exitoso!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al registrarse');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await authService.forgotPassword(email);
      toast.success('Se han enviado las instrucciones a tu email');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al procesar la solicitud');
      throw error;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      await authService.resetPassword(token, password);
      toast.success('Contraseña actualizada exitosamente');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al restablecer la contraseña');
      throw error;
    }
  };

  if (!isInitialized) {
    return <LoadingSpinner />;
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
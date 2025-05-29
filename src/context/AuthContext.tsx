import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import type { User, AuthContextType } from '../types/auth';
import authService from '../services/auth.service';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          setIsInitialized(true);
          return;
        }

        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token, user: userData } = await authService.login({
        email,
        password,
      });
      localStorage.setItem('token', token);
      setUser(userData);
      toast.success('¡Bienvenido!');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al iniciar sesión';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
      toast.success('¡Hasta pronto!');
    } catch (error) {
      console.error('Error during logout:', error);
      const message =
        error instanceof Error ? error.message : 'Error al cerrar sesión';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) => {
    setIsLoading(true);
    try {
      const { token, user: newUser } = await authService.register(userData);
      localStorage.setItem('token', token);
      setUser(newUser);
      toast.success('¡Registro exitoso!');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al registrarse';
      toast.error(message);
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
      const message =
        error instanceof Error
          ? error.message
          : 'Error al procesar la solicitud';
      toast.error(message);
      throw error;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      await authService.resetPassword(token, password);
      toast.success('Contraseña actualizada exitosamente');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al restablecer la contraseña';
      toast.error(message);
      throw error;
    }
  };

  // No mostrar nada hasta que la inicialización esté completa
  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

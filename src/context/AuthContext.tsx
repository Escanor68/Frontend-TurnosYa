import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import type { User, AuthContextType } from '../types/auth';
import authService from '../services/auth.service';
import LoadingSpinner from '../components/common/LoadingSpinner';

const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => { throw new Error('AuthContext not initialized') },
  register: async () => { throw new Error('AuthContext not initialized') },
  logout: async () => { throw new Error('AuthContext not initialized') },
  forgotPassword: async () => { throw new Error('AuthContext not initialized') },
  resetPassword: async () => { throw new Error('AuthContext not initialized') },
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState({
    user: null as User | null,
    isLoading: true,
    error: null as Error | null,
    isInitialized: false
  });

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          if (mounted) {
            setState(prev => ({
              ...prev,
              isLoading: false,
              isInitialized: true
            }));
          }
          return;
        }

        const userData = await authService.getCurrentUser();
        if (mounted) {
          setState(prev => ({
            ...prev,
            user: userData,
            isLoading: false,
            isInitialized: true
          }));
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        localStorage.removeItem('token');
        if (mounted) {
          setState(prev => ({
            ...prev,
            user: null,
            error: err instanceof Error ? err : new Error('Failed to initialize auth'),
            isLoading: false,
            isInitialized: true
          }));
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
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { token, user: userData } = await authService.login({ email, password });
      localStorage.setItem('token', token);
      setState(prev => ({ ...prev, user: userData, isLoading: false }));
      toast.success('¡Bienvenido!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setState(prev => ({ ...prev, error: new Error(message), isLoading: false }));
      toast.error(message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await authService.logout();
    } catch (err) {
      console.error('Error during logout:', err);
      const message = err instanceof Error ? err.message : 'Error al cerrar sesión';
      toast.error(message);
    } finally {
      localStorage.removeItem('token');
      setState(prev => ({ ...prev, user: null, isLoading: false }));
    }
  };

  const register = async (userData: { email: string; password: string; name: string; role: string }) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { token, user: newUser } = await authService.register(userData);
      localStorage.setItem('token', token);
      setState(prev => ({ ...prev, user: newUser, isLoading: false }));
      toast.success('¡Registro exitoso!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      setState(prev => ({ ...prev, error: new Error(message), isLoading: false }));
      toast.error(message);
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setState(prev => ({ ...prev, error: null }));
      await authService.forgotPassword(email);
      toast.success('Se han enviado las instrucciones a tu email');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al procesar la solicitud';
      setState(prev => ({ ...prev, error: new Error(message) }));
      toast.error(message);
      throw err;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      setState(prev => ({ ...prev, error: null }));
      await authService.resetPassword(token, password);
      toast.success('Contraseña actualizada exitosamente');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al restablecer la contraseña';
      setState(prev => ({ ...prev, error: new Error(message) }));
      toast.error(message);
      throw err;
    }
  };

  if (!state.isInitialized) {
    return <LoadingSpinner />;
  }

  const value: AuthContextType = {
    user: state.user,
    isAuthenticated: !!state.user,
    isLoading: state.isLoading,
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
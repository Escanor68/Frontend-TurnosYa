import React, { createContext, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { User, AuthContextType } from '../types/auth';
import { authService } from '../services/auth.service';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      setUser(user);
      toast.success('¡Bienvenido!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al iniciar sesión');
      throw error;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, role: string) => {
    try {
      const user = await authService.register(email, password, name, role);
      setUser(user);
      toast.success('¡Registro exitoso!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al registrarse');
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    toast.success('¡Hasta pronto!');
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      await authService.forgotPassword(email);
      toast.success('Se han enviado las instrucciones a tu email');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al procesar la solicitud');
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (token: string, password: string) => {
    try {
      await authService.resetPassword(token, password);
      toast.success('Contraseña actualizada exitosamente');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al restablecer la contraseña');
      throw error;
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
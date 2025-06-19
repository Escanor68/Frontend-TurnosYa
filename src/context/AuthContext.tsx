import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { User, RegisterData } from '../types/user';
import { userService } from '../services/user.service';
import LoadingSpinner from '../components/common/LoadingSpinner';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          setIsInitialized(true);
          return;
        }

        const userData = await userService.getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('token');
        setError(
          error instanceof Error
            ? error.message
            : 'Error al inicializar la autenticación'
        );
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
      const { token, user: userData } = await userService.login({
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

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const newUser = await userService.register(userData);
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

  const logout = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem('token');
      setUser(null);
      toast.success('¡Hasta pronto!');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al cerrar sesión';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await userService.forgotPassword({ email });
      toast.success('Se ha enviado un correo con las instrucciones');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al procesar la solicitud';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      await userService.resetPassword({
        token,
        password,
        confirmPassword: password,
      });
      toast.success('Contraseña actualizada correctamente');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al restablecer la contraseña';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      const updatedUser = await userService.updateProfile(userData);
      setUser(updatedUser);
      toast.success('Perfil actualizado correctamente');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al actualizar el perfil';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

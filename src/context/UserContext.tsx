import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Notification as UserNotification } from '../types/notification';
import { userService } from '../services/user.service';
import { useAuth } from '../hooks/useAuth';

interface UserContextType {
  notifications: UserNotification[];
  favoriteFields: string[];
  isLoading: boolean;
  error: string | null;
  getNotifications: () => Promise<void>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  getFavoriteFields: () => Promise<void>;
  addFavoriteField: (fieldId: string) => Promise<void>;
  removeFavoriteField: (fieldId: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [favoriteFields, setFavoriteFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getNotifications();
      getFavoriteFields();
    }
  }, [user]);

  const getNotifications = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getNotifications();
      setNotifications(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al obtener notificaciones';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    setIsLoading(true);
    try {
      await userService.markNotificationAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
      toast.success('Notificación marcada como leída');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al marcar la notificación como leída';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getFavoriteFields = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getFavoriteFields();
      setFavoriteFields(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al obtener campos favoritos';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavoriteField = async (fieldId: string) => {
    setIsLoading(true);
    try {
      await userService.addFavoriteField(fieldId);
      setFavoriteFields((prev) => [...prev, fieldId]);
      toast.success('Campo agregado a favoritos');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al agregar campo a favoritos';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavoriteField = async (fieldId: string) => {
    setIsLoading(true);
    try {
      await userService.removeFavoriteField(fieldId);
      setFavoriteFields((prev) => prev.filter((id) => id !== fieldId));
      toast.success('Campo eliminado de favoritos');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al eliminar campo de favoritos';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        notifications,
        favoriteFields,
        isLoading,
        error,
        getNotifications,
        markNotificationAsRead,
        getFavoriteFields,
        addFavoriteField,
        removeFavoriteField,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

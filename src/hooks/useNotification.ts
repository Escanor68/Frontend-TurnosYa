import { useState, useCallback, useEffect } from 'react';
import { notificationService } from '../services/NotificationService';
import { Notification, NotificationPreferences } from '../types/notification';

interface NotificationState {
  notifications: Notification[];
  preferences: NotificationPreferences | null;
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

export const useNotification = () => {
  const [state, setState] = useState<NotificationState>({
    notifications: [],
    preferences: null,
    unreadCount: 0,
    isLoading: false,
    error: null,
  });

  const loadNotifications = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const notifications = await notificationService.getNotifications();
      const unreadCount = notifications.filter((n) => !n.read).length;
      setState((prev) => ({
        ...prev,
        notifications,
        unreadCount,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error al cargar las notificaciones',
      }));
    }
  }, []);

  const loadPreferences = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const preferences = await notificationService.getPreferences();
      setState((prev) => ({
        ...prev,
        preferences,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error al cargar las preferencias',
      }));
    }
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const updatedNotification = await notificationService.markAsRead(id);
      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.map((n) =>
          n.id === id ? updatedNotification : n
        ),
        unreadCount: prev.unreadCount - 1,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error al marcar como leída la notificación',
      }));
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      await notificationService.markAllAsRead();
      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error al marcar todas como leídas',
      }));
    }
  }, []);

  const deleteNotification = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      await notificationService.deleteNotification(id);
      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.filter((n) => n.id !== id),
        unreadCount: prev.notifications.find((n) => n.id === id)?.read
          ? prev.unreadCount
          : prev.unreadCount - 1,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error al eliminar la notificación',
      }));
    }
  }, []);

  const updatePreferences = useCallback(
    async (preferences: Partial<NotificationPreferences>) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const updatedPreferences = await notificationService.updatePreferences(
          preferences
        );
        setState((prev) => ({
          ...prev,
          preferences: updatedPreferences,
          isLoading: false,
          error: null,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Error al actualizar las preferencias',
        }));
      }
    },
    []
  );

  useEffect(() => {
    loadNotifications();
    loadPreferences();
  }, [loadNotifications, loadPreferences]);

  return {
    ...state,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updatePreferences,
    refreshNotifications: loadNotifications,
  };
};

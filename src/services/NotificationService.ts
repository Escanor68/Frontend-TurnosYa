import { apiService } from './api';
import { Notification, NotificationPreferences } from '../types/notification';

class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public async getNotifications(): Promise<Notification[]> {
    const response = await apiService.get<Notification[]>('/notifications');
    return response.data;
  }

  public async markAsRead(id: string): Promise<Notification> {
    const response = await apiService.put<Notification>(
      `/notifications/${id}/read`
    );
    return response.data;
  }

  public async markAllAsRead(): Promise<void> {
    await apiService.put('/notifications/read-all');
  }

  public async deleteNotification(id: string): Promise<void> {
    await apiService.delete(`/notifications/${id}`);
  }

  public async getPreferences(): Promise<NotificationPreferences> {
    const response = await apiService.get<NotificationPreferences>(
      '/notifications/preferences'
    );
    return response.data;
  }

  public async updatePreferences(
    preferences: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> {
    const response = await apiService.put<NotificationPreferences>(
      '/notifications/preferences',
      preferences
    );
    return response.data;
  }
}

export const notificationService = NotificationService.getInstance();

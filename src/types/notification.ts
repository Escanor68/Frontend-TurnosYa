export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationData {
  bookingId?: string;
  paymentId?: string;
  fieldId?: string;
  amount?: number;
  status?: string;
  date?: string;
  time?: string;
  fieldName?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  types: {
    [key in NotificationType]: boolean;
  };
}

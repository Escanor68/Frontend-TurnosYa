import React from 'react';
import { useUser } from '../../context/UserContext';
import { Bell, Check } from 'lucide-react';

export const NotificationList: React.FC = () => {
  const { notifications, markNotificationAsRead, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        <Bell className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2">No tienes notificaciones</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg border ${
            notification.read
              ? 'bg-gray-50 border-gray-200'
              : 'bg-white border-emerald-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {notification.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {notification.message}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
            {!notification.read && (
              <button
                onClick={() => markNotificationAsRead(notification.id)}
                className="ml-4 p-1 rounded-full hover:bg-gray-100"
                title="Marcar como leída"
              >
                <Check className="h-5 w-5 text-emerald-500" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

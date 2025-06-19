import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config';

interface NotificationOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
}

export const useNotification = () => {
  const showSuccess = useCallback(
    (message: string, options?: NotificationOptions) => {
      toast.success(message, {
        autoClose: options?.duration || 3000,
        position: options?.position || 'top-right',
      });
    },
    []
  );

  const showError = useCallback(
    (message: string, options?: NotificationOptions) => {
      toast.error(message, {
        autoClose: options?.duration || 5000,
        position: options?.position || 'top-right',
      });
    },
    []
  );

  const showWarning = useCallback(
    (message: string, options?: NotificationOptions) => {
      toast.warning(message, {
        autoClose: options?.duration || 4000,
        position: options?.position || 'top-right',
      });
    },
    []
  );

  const showInfo = useCallback(
    (message: string, options?: NotificationOptions) => {
      toast.info(message, {
        autoClose: options?.duration || 3000,
        position: options?.position || 'top-right',
      });
    },
    []
  );

  // Predefined success messages
  const showBookingCreated = useCallback(() => {
    showSuccess(SUCCESS_MESSAGES.BOOKING_CREATED);
  }, [showSuccess]);

  const showBookingUpdated = useCallback(() => {
    showSuccess(SUCCESS_MESSAGES.BOOKING_UPDATED);
  }, [showSuccess]);

  const showBookingCancelled = useCallback(() => {
    showSuccess(SUCCESS_MESSAGES.BOOKING_CANCELLED);
  }, [showSuccess]);

  const showPaymentSuccess = useCallback(() => {
    showSuccess(SUCCESS_MESSAGES.PAYMENT_SUCCESS);
  }, [showSuccess]);

  const showProfileUpdated = useCallback(() => {
    showSuccess(SUCCESS_MESSAGES.PROFILE_UPDATED);
  }, [showSuccess]);

  const showPasswordChanged = useCallback(() => {
    showSuccess(SUCCESS_MESSAGES.PASSWORD_CHANGED);
  }, [showSuccess]);

  const showEmailSent = useCallback(() => {
    showSuccess(SUCCESS_MESSAGES.EMAIL_SENT);
  }, [showSuccess]);

  // Predefined error messages
  const showNetworkError = useCallback(() => {
    showError(ERROR_MESSAGES.NETWORK_ERROR);
  }, [showError]);

  const showUnauthorizedError = useCallback(() => {
    showError(ERROR_MESSAGES.UNAUTHORIZED);
  }, [showError]);

  const showForbiddenError = useCallback(() => {
    showError(ERROR_MESSAGES.FORBIDDEN);
  }, [showError]);

  const showNotFoundError = useCallback(() => {
    showError(ERROR_MESSAGES.NOT_FOUND);
  }, [showError]);

  const showValidationError = useCallback(() => {
    showError(ERROR_MESSAGES.VALIDATION_ERROR);
  }, [showError]);

  const showServerError = useCallback(() => {
    showError(ERROR_MESSAGES.SERVER_ERROR);
  }, [showError]);

  const showUnknownError = useCallback(() => {
    showError(ERROR_MESSAGES.UNKNOWN_ERROR);
  }, [showError]);

  // Error handler for API calls
  const handleApiError = useCallback(
    (error: unknown) => {
      if (error instanceof Error) {
        if (
          error.message.includes('Network Error') ||
          error.message.includes('fetch')
        ) {
          showNetworkError();
        } else if (error.message.includes('401')) {
          showUnauthorizedError();
        } else if (error.message.includes('403')) {
          showForbiddenError();
        } else if (error.message.includes('404')) {
          showNotFoundError();
        } else if (
          error.message.includes('422') ||
          error.message.includes('400')
        ) {
          showValidationError();
        } else if (error.message.includes('500')) {
          showServerError();
        } else {
          showError(error.message);
        }
      } else {
        showUnknownError();
      }
    },
    [
      showNetworkError,
      showUnauthorizedError,
      showForbiddenError,
      showNotFoundError,
      showValidationError,
      showServerError,
      showError,
      showUnknownError,
    ]
  );

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showBookingCreated,
    showBookingUpdated,
    showBookingCancelled,
    showPaymentSuccess,
    showProfileUpdated,
    showPasswordChanged,
    showEmailSent,
    showNetworkError,
    showUnauthorizedError,
    showForbiddenError,
    showNotFoundError,
    showValidationError,
    showServerError,
    showUnknownError,
    handleApiError,
  };
};

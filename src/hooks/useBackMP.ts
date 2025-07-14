import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  backMPService,
  BackMPPaymentPreference,
  BackMPRefundStatus,
} from '../services/backmp.service';
import { PaymentStatus } from '../types/payment';

interface UseBackMPReturn {
  // Estados
  isLoading: boolean;
  error: string | null;

  // Funciones de pago
  createPaymentPreference: (
    bookingId: string,
    amount: number
  ) => Promise<BackMPPaymentPreference | null>;
  getPaymentStatus: (paymentId: string) => Promise<PaymentStatus | null>;

  // Funciones de reembolso
  requestRefund: (
    paymentId: string,
    reason: string,
    amount?: number
  ) => Promise<BackMPRefundStatus | null>;
  getRefundStatus: (paymentId: string) => Promise<BackMPRefundStatus | null>;
  getUserRefunds: () => Promise<BackMPRefundStatus[]>;

  // Funciones de facturación
  generateInvoice: (paymentId: string) => Promise<void>;
  sendInvoiceEmail: (paymentId: string) => Promise<void>;

  // Funciones de salud del sistema
  healthCheck: () => Promise<boolean>;
  backFutbolHealthCheck: () => Promise<boolean>;

  // Utilidades
  clearError: () => void;
}

// Funciones auxiliares para manejo de errores
const handleError = (error: unknown, defaultMessage: string): string => {
  const message = error instanceof Error ? error.message : defaultMessage;
  console.error(`❌ [useBackMP] ${defaultMessage}:`, error);
  return message;
};

const showSuccessToast = (message: string) => {
  toast.success(message);
};

const showErrorToast = (message: string) => {
  toast.error(message);
};

// Funciones auxiliares para logging
const logOperation = (operation: string, data?: unknown) => {
  console.log(`🚀 [useBackMP] ${operation}:`, data);
};

const logSuccess = (operation: string, result?: unknown) => {
  console.log(`✅ [useBackMP] ${operation}:`, result);
};

// Función auxiliar para manejo de operaciones asíncronas
const executeAsyncOperation = async <T>(
  operation: () => Promise<T>,
  operationName: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  successMessage?: string
): Promise<T | null> => {
  setLoading(true);
  setError(null);

  try {
    logOperation(operationName);
    const result = await operation();
    logSuccess(operationName, result);

    if (successMessage) {
      showSuccessToast(successMessage);
    }

    return result;
  } catch (error) {
    const errorMessage = handleError(error, `Error en ${operationName}`);
    setError(errorMessage);
    showErrorToast(errorMessage);
    return null;
  } finally {
    setLoading(false);
  }
};

// Función auxiliar para descarga de archivos
const downloadBlob = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const useBackMP = (): UseBackMPReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const createPaymentPreference = useCallback(
    async (bookingId: string, amount: number) => {
      return executeAsyncOperation(
        () => backMPService.createPaymentPreference(bookingId, amount),
        'Creando preferencia de pago',
        setIsLoading,
        setError,
        'Preferencia de pago creada correctamente'
      );
    },
    []
  );

  const getPaymentStatus = useCallback(async (paymentId: string) => {
    const result = await executeAsyncOperation(
      () => backMPService.getPaymentStatus(paymentId),
      'Obteniendo estado del pago',
      setIsLoading,
      setError,
      undefined
    );

    return result ? result.status : null;
  }, []);

  const requestRefund = useCallback(
    async (paymentId: string, reason: string, amount?: number) => {
      return executeAsyncOperation(
        () => backMPService.requestRefund({ paymentId, reason, amount }),
        'Solicitando reembolso',
        setIsLoading,
        setError,
        'Reembolso solicitado correctamente'
      );
    },
    []
  );

  const getRefundStatus = useCallback(async (paymentId: string) => {
    return executeAsyncOperation(
      () => backMPService.getRefundStatus(paymentId),
      'Obteniendo estado del reembolso',
      setIsLoading,
      setError,
      undefined
    );
  }, []);

  const getUserRefunds = useCallback(async () => {
    const result = await executeAsyncOperation(
      () => backMPService.getUserRefunds(),
      'Obteniendo reembolsos del usuario',
      setIsLoading,
      setError,
      undefined
    );

    return result || [];
  }, []);

  const generateInvoice = useCallback(async (paymentId: string) => {
    const blob = await executeAsyncOperation(
      () => backMPService.generateInvoice(paymentId),
      'Generando factura',
      setIsLoading,
      setError,
      undefined
    );

    if (blob) {
      downloadBlob(blob, `invoice-${paymentId}.pdf`);
      showSuccessToast('Factura descargada correctamente');
    }
  }, []);

  const sendInvoiceEmail = useCallback(async (paymentId: string) => {
    await executeAsyncOperation(
      () => backMPService.sendInvoiceEmail(paymentId),
      'Enviando factura por email',
      setIsLoading,
      setError,
      'Factura enviada por email correctamente'
    );
  }, []);

  const healthCheck = useCallback(async () => {
    const result = await executeAsyncOperation(
      () => backMPService.healthCheck(),
      'Verificando salud del sistema',
      setIsLoading,
      setError,
      undefined
    );

    return result ? result.status === 'OK' : false;
  }, []);

  const backFutbolHealthCheck = useCallback(async () => {
    const result = await executeAsyncOperation(
      () => backMPService.backFutbolHealthCheck(),
      'Verificando salud de BackFutbol',
      setIsLoading,
      setError,
      undefined
    );

    return result ? result.status === 'OK' : false;
  }, []);

  return {
    isLoading,
    error,
    createPaymentPreference,
    getPaymentStatus,
    requestRefund,
    getRefundStatus,
    getUserRefunds,
    generateInvoice,
    sendInvoiceEmail,
    healthCheck,
    backFutbolHealthCheck,
    clearError,
  };
};

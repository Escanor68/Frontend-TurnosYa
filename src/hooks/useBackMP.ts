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

export const useBackMP = (): UseBackMPReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const createPaymentPreference = useCallback(
    async (bookingId: string, amount: number) => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('🚀 [useBackMP] Creando preferencia de pago:', {
          bookingId,
          amount,
        });
        const preference = await backMPService.createPaymentPreference(
          bookingId,
          amount
        );
        console.log('✅ [useBackMP] Preferencia creada:', preference);
        toast.success('Preferencia de pago creada correctamente');
        return preference;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Error al crear la preferencia de pago';
        setError(message);
        toast.error(message);
        console.error('❌ [useBackMP] Error creating preference:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getPaymentStatus = useCallback(async (paymentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('🚀 [useBackMP] Obteniendo estado del pago:', paymentId);
      const { status } = await backMPService.getPaymentStatus(paymentId);
      console.log('✅ [useBackMP] Estado del pago:', status);
      return status;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al obtener el estado del pago';
      setError(message);
      toast.error(message);
      console.error('❌ [useBackMP] Error getting payment status:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestRefund = useCallback(
    async (paymentId: string, reason: string, amount?: number) => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('🚀 [useBackMP] Solicitando reembolso:', {
          paymentId,
          reason,
          amount,
        });
        const refund = await backMPService.requestRefund({
          paymentId,
          reason,
          amount,
        });
        console.log('✅ [useBackMP] Reembolso solicitado:', refund);
        toast.success('Reembolso solicitado correctamente');
        return refund;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Error al solicitar el reembolso';
        setError(message);
        toast.error(message);
        console.error('❌ [useBackMP] Error requesting refund:', error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getRefundStatus = useCallback(async (paymentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('🚀 [useBackMP] Obteniendo estado del reembolso:', paymentId);
      const refund = await backMPService.getRefundStatus(paymentId);
      console.log('✅ [useBackMP] Estado del reembolso:', refund);
      return refund;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al obtener el estado del reembolso';
      setError(message);
      toast.error(message);
      console.error('❌ [useBackMP] Error getting refund status:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserRefunds = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('🚀 [useBackMP] Obteniendo reembolsos del usuario');
      const refunds = await backMPService.getUserRefunds();
      console.log('✅ [useBackMP] Reembolsos obtenidos:', refunds.length);
      return refunds;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al obtener los reembolsos';
      setError(message);
      toast.error(message);
      console.error('❌ [useBackMP] Error getting user refunds:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateInvoice = useCallback(async (paymentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('🚀 [useBackMP] Generando factura:', paymentId);
      const blob = await backMPService.generateInvoice(paymentId);

      // Crear URL para descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${paymentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log('✅ [useBackMP] Factura generada y descargada');
      toast.success('Factura descargada correctamente');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al generar la factura';
      setError(message);
      toast.error(message);
      console.error('❌ [useBackMP] Error generating invoice:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendInvoiceEmail = useCallback(async (paymentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('🚀 [useBackMP] Enviando factura por email:', paymentId);
      await backMPService.sendInvoiceEmail(paymentId);
      console.log('✅ [useBackMP] Factura enviada por email');
      toast.success('Factura enviada por email correctamente');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al enviar la factura por email';
      setError(message);
      toast.error(message);
      console.error('❌ [useBackMP] Error sending invoice email:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const healthCheck = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('🚀 [useBackMP] Verificando salud del sistema');
      const health = await backMPService.healthCheck();
      console.log('✅ [useBackMP] Salud del sistema:', health);
      return health.status === 'OK';
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al verificar la salud del sistema';
      setError(message);
      console.error('❌ [useBackMP] Health check failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const backFutbolHealthCheck = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('🚀 [useBackMP] Verificando conectividad con BackFutbol');
      const health = await backMPService.backFutbolHealthCheck();
      console.log('✅ [useBackMP] Conectividad con BackFutbol:', health);
      return health.backFutbol.connected;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al verificar la conectividad con BackFutbol';
      setError(message);
      console.error('❌ [useBackMP] BackFutbol health check failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
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

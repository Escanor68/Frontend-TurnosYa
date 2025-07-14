import React, { createContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  Payment,
  PaymentStatus,
  PaymentMethod,
  Invoice,
  PaymentReport,
  PaymentPreference,
} from '../types/payment';
import {
  backMPService,
  BackMPPaymentPreference,
  BackMPRefundStatus,
} from '../services/backmp.service';

interface PaymentContextType {
  paymentHistory: PaymentReport[];
  invoices: Invoice[];
  isLoading: boolean;
  error: string | null;
  createPayment: (data: Payment) => Promise<void>;
  processPayment: (paymentId: string) => Promise<void>;
  getPaymentStatus: (paymentId: string) => Promise<{ status: PaymentStatus }>;
  getPaymentHistory: () => Promise<void>;
  getInvoices: () => Promise<void>;
  getInvoice: (invoiceId: string) => Promise<Invoice>;
  sendInvoiceEmail: (paymentId: string) => Promise<void>;
  requestRefund: (paymentId: string, reason: string) => Promise<void>;
  downloadInvoice: (paymentId: string) => Promise<void>;
  createPaymentPreference: (
    bookingId: string,
    amount: number
  ) => Promise<PaymentPreference>;
  loading: boolean;
  fetchPaymentHistory: () => Promise<void>;
}

export const PaymentContext = createContext<PaymentContextType | undefined>(
  undefined
);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [paymentHistory, setPaymentHistory] = useState<PaymentReport[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // BackMP no tiene getInvoices, usamos getUserRefunds como alternativa
      const refunds = await backMPService.getUserRefunds();
      const history: PaymentReport[] = refunds.map((refund) => ({
        id: refund.id,
        bookingId: refund.paymentId,
        amount: refund.amount,
        currency: 'ARS',
        status: 'refunded' as PaymentStatus,
        date: refund.createdAt,
        method: 'mercadopago' as PaymentMethod,
      }));
      setPaymentHistory(history);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al obtener el historial de pagos';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPayment = async (data: Payment) => {
    setIsLoading(true);
    try {
      // BackMP maneja pagos a través de preferencias, no creación directa
      toast.info('Los pagos se procesan a través de MercadoPago');
      await fetchPaymentHistory();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al crear el pago';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const processPayment = async (paymentId: string) => {
    setIsLoading(true);
    try {
      // BackMP no tiene processPayment, verificamos el estado
      await backMPService.getPaymentStatus(paymentId);
      await fetchPaymentHistory();
      toast.success('Estado del pago verificado correctamente');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al procesar el pago';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPaymentStatus = useCallback(async (paymentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      return await backMPService.getPaymentStatus(paymentId);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al obtener el estado del pago';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getInvoices = async () => {
    setIsLoading(true);
    try {
      // BackMP no tiene getInvoices, usamos getUserRefunds
      const refunds = await backMPService.getUserRefunds();
      // Convertir refunds a formato de invoices para compatibilidad
      const invoiceList: Invoice[] = refunds.map((refund) => ({
        id: refund.id,
        bookingId: refund.paymentId,
        number: `REF-${refund.id}`,
        date: refund.createdAt,
        amount: refund.amount,
        currency: 'ARS',
        status: 'paid' as const,
        paymentMethod: 'mercadopago' as PaymentMethod,
        items: [
          {
            description: 'Reembolso',
            quantity: 1,
            unitPrice: refund.amount,
            total: refund.amount,
          },
        ],
        customer: {
          name: 'Usuario',
          email: 'usuario@example.com',
        },
      }));
      setInvoices(invoiceList);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al obtener las facturas';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getInvoice = async (invoiceId: string): Promise<Invoice> => {
    try {
      // BackMP no tiene getInvoiceById, usamos getRefundStatus
      const refund = await backMPService.getRefundStatus(invoiceId);
      return {
        id: refund.id,
        bookingId: refund.paymentId,
        number: `REF-${refund.id}`,
        date: refund.createdAt,
        amount: refund.amount,
        currency: 'ARS',
        status: 'paid' as const,
        paymentMethod: 'mercadopago' as PaymentMethod,
        items: [
          {
            description: 'Reembolso',
            quantity: 1,
            unitPrice: refund.amount,
            total: refund.amount,
          },
        ],
        customer: {
          name: 'Usuario',
          email: 'usuario@example.com',
        },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al obtener la factura';
      toast.error(message);
      throw error;
    }
  };

  const requestRefund = useCallback(
    async (paymentId: string, reason: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await backMPService.requestRefund({ paymentId, reason });
        await fetchPaymentHistory();
        toast.success('Reembolso solicitado correctamente');
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Error al solicitar el reembolso';
        setError(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchPaymentHistory]
  );

  const downloadInvoice = useCallback(async (paymentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
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
      toast.success('Factura descargada correctamente');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al descargar la factura';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendInvoiceEmail = useCallback(async (paymentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await backMPService.sendInvoiceEmail(paymentId);
      toast.success('Factura enviada por email correctamente');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al enviar la factura por email';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPaymentPreference = useCallback(
    async (bookingId: string, amount: number) => {
      setIsLoading(true);
      setError(null);
      try {
        return await backMPService.createPaymentPreference(bookingId, amount);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Error al crear la preferencia de pago';
        setError(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const value = {
    paymentHistory,
    invoices,
    isLoading,
    error,
    createPayment,
    processPayment,
    getPaymentStatus,
    getPaymentHistory: fetchPaymentHistory,
    getInvoices,
    getInvoice,
    sendInvoiceEmail,
    requestRefund,
    downloadInvoice,
    createPaymentPreference,
    loading: isLoading,
    fetchPaymentHistory,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

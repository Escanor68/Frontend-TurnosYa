import React, { createContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  Payment,
  PaymentStatus,
  Invoice,
  PaymentReport,
  PaymentPreference,
} from '../types/payment';
import { paymentService } from '../services/payment.service';

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
  createPaymentPreference: (bookingId: string) => Promise<PaymentPreference>;
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
      const invoiceList = await paymentService.getInvoices();
      const history: PaymentReport[] = invoiceList.map((invoice) => ({
        id: invoice.id,
        bookingId: invoice.bookingId,
        amount: invoice.amount,
        currency: invoice.currency,
        status: invoice.status as PaymentStatus,
        date: invoice.date,
        method: invoice.paymentMethod,
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
      await paymentService.createPayment(data);
      await fetchPaymentHistory();
      toast.success('Pago creado correctamente');
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
      await paymentService.processPayment(paymentId);
      await fetchPaymentHistory();
      toast.success('Pago procesado correctamente');
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
      return await paymentService.getPaymentStatus(paymentId);
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
      const invoiceList = await paymentService.getInvoices();
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
      return await paymentService.getInvoiceById(invoiceId);
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
        await paymentService.requestRefund(paymentId, reason);
        await fetchPaymentHistory();
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
      await paymentService.getInvoice(paymentId);
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
      await paymentService.sendInvoiceEmail(paymentId);
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

  const createPaymentPreference = useCallback(async (bookingId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const preference: PaymentPreference = {
        id: '',
        bookingId,
        amount: 0,
        currency: 'ARS',
        initPoint: '',
        sandboxInitPoint: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return await paymentService.createPaymentPreference(preference);
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
  }, []);

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

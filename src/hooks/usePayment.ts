import { useState, useCallback } from 'react';
import { paymentService } from '../services/payment.service';
import {
  Payment,
  PaymentPreference,
  PaymentReport,
  Invoice,
} from '../types/payment';

interface PaymentState {
  payment: Payment | null;
  preference: PaymentPreference | null;
  report: PaymentReport | null;
  invoice: Invoice | null;
  isLoading: boolean;
  error: string | null;
}

export const usePayment = () => {
  const [state, setState] = useState<PaymentState>({
    payment: null,
    preference: null,
    report: null,
    invoice: null,
    isLoading: false,
    error: null,
  });

  const createPayment = useCallback(async (payment: Partial<Payment>) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const newPayment = await paymentService.createPayment(payment);
      setState((prev) => ({
        ...prev,
        payment: newPayment,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Error al crear el pago',
      }));
    }
  }, []);

  const createPaymentPreference = useCallback(
    async (preference: PaymentPreference) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const newPreference = await paymentService.createPaymentPreference(
          preference
        );
        setState((prev) => ({
          ...prev,
          preference: newPreference,
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
              : 'Error al crear la preferencia de pago',
        }));
      }
    },
    []
  );

  const getPaymentReport = useCallback(
    async (startDate: string, endDate: string) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const report = await paymentService.getPaymentReport({
          startDate,
          endDate,
        });
        setState((prev) => ({
          ...prev,
          report,
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
              : 'Error al obtener el reporte de pagos',
        }));
      }
    },
    []
  );

  const generateInvoice = useCallback(async (paymentId: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const invoice = await paymentService.generateInvoice(paymentId);
      setState((prev) => ({
        ...prev,
        invoice,
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
            : 'Error al generar la factura',
      }));
    }
  }, []);

  const processPayment = useCallback(async (paymentId: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      await paymentService.processPayment(paymentId);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Error al procesar el pago',
      }));
    }
  }, []);

  const requestRefund = useCallback(
    async (paymentId: string, reason: string) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        await paymentService.requestRefund(paymentId, reason);
        setState((prev) => ({
          ...prev,
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
              : 'Error al solicitar el reembolso',
        }));
      }
    },
    []
  );

  return {
    ...state,
    createPayment,
    createPaymentPreference,
    getPaymentReport,
    generateInvoice,
    processPayment,
    requestRefund,
  };
};

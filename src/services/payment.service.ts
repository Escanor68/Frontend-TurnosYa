import mercadoPagoApi from './api/mercadopago.api';
import { PaymentPreference, PaymentResult } from '../types';

export const paymentService = {
  // Payment preferences
  createPaymentPreference: (bookingId: string, amount: number) =>
    mercadoPagoApi.post('/payment/preference', { bookingId, amount }),

  // Payment processing
  processPayment: (paymentData: PaymentPreference) =>
    mercadoPagoApi.post('/payment/process', paymentData),

  // Payment status
  getPaymentStatus: (paymentId: string) =>
    mercadoPagoApi.get(`/payment/${paymentId}/status`),

  // Payment history
  getUserPayments: () => mercadoPagoApi.get('/payment/history'),

  // Refunds
  requestRefund: (paymentId: string) =>
    mercadoPagoApi.post(`/payment/${paymentId}/refund`),
};

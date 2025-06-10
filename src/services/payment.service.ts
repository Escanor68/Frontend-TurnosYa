import { apiService } from './api';
import {
  Payment,
  PaymentStatus,
  PaymentReport,
  PaymentPreference,
  Invoice,
} from '../types/payment';

class PaymentService {
  private static instance: PaymentService;

  private constructor() {}

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  public async createPayment(payment: Partial<Payment>): Promise<Payment> {
    const response = await apiService.post<Payment>('/payments', payment);
    return response.data;
  }

  public async getPaymentById(id: string): Promise<Payment> {
    const response = await apiService.get<Payment>(`/payments/${id}`);
    return response.data;
  }

  public async updatePayment(
    id: string,
    payment: Partial<Payment>
  ): Promise<Payment> {
    const response = await apiService.put<Payment>(`/payments/${id}`, payment);
    return response.data;
  }

  public async deletePayment(id: string): Promise<void> {
    await apiService.delete(`/payments/${id}`);
  }

  public async createPaymentPreference(
    preference: PaymentPreference
  ): Promise<PaymentPreference> {
    const response = await apiService.post<PaymentPreference>(
      '/payments/preference',
      preference
    );
    return response.data;
  }

  public async getPaymentReport(params: {
    startDate: string;
    endDate: string;
  }): Promise<PaymentReport> {
    const response = await apiService.get<PaymentReport>('/payments/report', {
      params,
    });
    return response.data;
  }

  public async generateInvoice(paymentId: string): Promise<Invoice> {
    const response = await apiService.post<Invoice>(
      `/payments/${paymentId}/invoice`
    );
    return response.data;
  }

  public async getInvoices(params?: {
    startDate: string;
    endDate: string;
  }): Promise<Invoice[]> {
    const response = await apiService.get<Invoice[]>('/payments/invoices', {
      params,
    });
    return response.data;
  }

  public async getInvoiceById(id: string): Promise<Invoice> {
    const response = await apiService.get<Invoice>(`/payments/invoices/${id}`);
    return response.data;
  }

  public async processPayment(paymentId: string): Promise<void> {
    await apiService.post(`/payments/${paymentId}/process`);
  }

  public async getPaymentStatus(
    paymentId: string
  ): Promise<{ status: PaymentStatus }> {
    const response = await apiService.get<{ status: PaymentStatus }>(
      `/payments/${paymentId}/status`
    );
    return response.data;
  }

  public async requestRefund(paymentId: string, reason: string): Promise<void> {
    await apiService.post(`/payments/${paymentId}/refund`, { reason });
  }

  public async getInvoice(paymentId: string): Promise<Blob> {
    const response = await apiService.get<Blob>(
      `/payments/${paymentId}/invoice`,
      {
        responseType: 'blob',
      }
    );
    return response.data;
  }

  public async sendInvoiceEmail(paymentId: string): Promise<void> {
    await apiService.post(`/payments/${paymentId}/invoice/email`);
  }
}

export const paymentService = PaymentService.getInstance();

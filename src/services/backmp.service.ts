import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BACKMP_API_URL } from '../config/index';
import { PaymentStatus } from '../types/payment';

// Tipos específicos para BackMP
export interface BackMPPaymentPreference {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  initPoint: string;
  sandboxInitPoint: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackMPPayment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  mercadoPagoId?: string;
  preferenceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackMPRefundRequest {
  paymentId: string;
  reason: string;
  amount?: number; // Si no se especifica, se reembolsa el total
}

export interface BackMPRefundStatus {
  id: string;
  paymentId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  createdAt: string;
}

class BackMPService {
  private static instance: BackMPService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: BACKMP_API_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): BackMPService {
    if (!BackMPService.instance) {
      BackMPService.instance = new BackMPService();
    }
    return BackMPService.instance;
  }

  private setupInterceptors(): void {
    // Interceptor para agregar token de autenticación
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(
          '🚀 [BackMP] Request:',
          config.method?.toUpperCase(),
          config.url
        );
        return config;
      },
      (error) => {
        console.error('❌ [BackMP] Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Interceptor para respuestas
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(
          '✅ [BackMP] Response:',
          response.status,
          response.config.url
        );
        return response;
      },
      (error) => {
        console.error(
          '🚨 [BackMP] Response Error:',
          error.response?.status,
          error.response?.data?.message
        );

        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }

        return Promise.reject(error);
      }
    );
  }

  // Crear preferencia de pago
  public async createPaymentPreference(
    bookingId: string,
    amount: number
  ): Promise<BackMPPaymentPreference> {
    try {
      const response = await this.api.post<BackMPPaymentPreference>(
        '/payments/preference',
        {
          bookingId,
          amount,
          currency: 'ARS',
        }
      );
      return response.data;
    } catch (error) {
      console.error('❌ [BackMP] Error creating payment preference:', error);
      throw error;
    }
  }

  // Obtener estado de un pago
  public async getPaymentStatus(
    paymentId: string
  ): Promise<{ status: PaymentStatus }> {
    try {
      const response = await this.api.get<{ status: PaymentStatus }>(
        `/payments/${paymentId}/status`
      );
      return response.data;
    } catch (error) {
      console.error('❌ [BackMP] Error getting payment status:', error);
      throw error;
    }
  }

  // Obtener pago por ID
  public async getPaymentById(paymentId: string): Promise<BackMPPayment> {
    try {
      const response = await this.api.get<BackMPPayment>(
        `/payments/${paymentId}`
      );
      return response.data;
    } catch (error) {
      console.error('❌ [BackMP] Error getting payment:', error);
      throw error;
    }
  }

  // Solicitar reembolso
  public async requestRefund(
    refundRequest: BackMPRefundRequest
  ): Promise<BackMPRefundStatus> {
    try {
      const response = await this.api.post<BackMPRefundStatus>(
        `/payments/${refundRequest.paymentId}/refund`,
        {
          reason: refundRequest.reason,
          amount: refundRequest.amount,
        }
      );
      return response.data;
    } catch (error) {
      console.error('❌ [BackMP] Error requesting refund:', error);
      throw error;
    }
  }

  // Obtener estado del reembolso
  public async getRefundStatus(paymentId: string): Promise<BackMPRefundStatus> {
    try {
      const response = await this.api.get<BackMPRefundStatus>(
        `/payments/${paymentId}/refund-status`
      );
      return response.data;
    } catch (error) {
      console.error('❌ [BackMP] Error getting refund status:', error);
      throw error;
    }
  }

  // Obtener historial de reembolsos del usuario
  public async getUserRefunds(): Promise<BackMPRefundStatus[]> {
    try {
      const response = await this.api.get<BackMPRefundStatus[]>(
        '/payments/user/refunds'
      );
      return response.data;
    } catch (error) {
      console.error('❌ [BackMP] Error getting user refunds:', error);
      throw error;
    }
  }

  // Generar factura PDF
  public async generateInvoice(paymentId: string): Promise<Blob> {
    try {
      const response = await this.api.get(`/payments/${paymentId}/invoice`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('❌ [BackMP] Error generating invoice:', error);
      throw error;
    }
  }

  // Enviar factura por email
  public async sendInvoiceEmail(paymentId: string): Promise<void> {
    try {
      await this.api.post(`/payments/${paymentId}/invoice/email`);
    } catch (error) {
      console.error('❌ [BackMP] Error sending invoice email:', error);
      throw error;
    }
  }

  // Health check de BackMP
  public async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await this.api.get<{
        status: string;
        timestamp: string;
      }>('/health');
      return response.data;
    } catch (error) {
      console.error('❌ [BackMP] Health check failed:', error);
      throw error;
    }
  }

  // Verificar conectividad con BackFutbol
  public async backFutbolHealthCheck(): Promise<{
    status: string;
    backFutbol: { connected: boolean };
  }> {
    try {
      const response = await this.api.get<{
        status: string;
        backFutbol: { connected: boolean };
      }>('/backfutbol/health');
      return response.data;
    } catch (error) {
      console.error('❌ [BackMP] BackFutbol health check failed:', error);
      throw error;
    }
  }
}

export const backMPService = BackMPService.getInstance();

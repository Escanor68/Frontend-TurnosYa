// Tipos relacionados con pagos

export type PaymentMethod =
  | 'mercadopago'
  | 'credit_card'
  | 'debit_card'
  | 'cash';
export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export interface Transaction {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  paymentDetails?: PaymentDetails;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentDetails {
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
  installments?: number;
}

export interface PaymentPreference {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  initPoint: string;
  sandboxInitPoint: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentReport {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  date: string;
  method: PaymentMethod;
}

export interface Invoice {
  id: string;
  bookingId: string;
  number: string;
  date: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'cancelled';
  paymentMethod: PaymentMethod;
  items: InvoiceItem[];
  customer: {
    name: string;
    email: string;
    taxId?: string;
  };
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface RefundRequest {
  paymentId: string;
  reason: string;
  amount?: number;
}

export interface Customer {
  name: string;
  email: string;
  document: string;
  documentType: string;
}

export interface PaymentResponse {
  id: string;
  status: PaymentStatus;
  statusDetail: string;
  externalId?: string;
}

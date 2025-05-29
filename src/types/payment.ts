// Tipos relacionados con pagos

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface Transaction {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

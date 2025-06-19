import { useEffect, useState } from 'react';
import { usePayment } from '../../hooks/usePayment';
import type { PaymentStatus } from '../../types/payment';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

interface PaymentStatusProps {
  paymentId: string;
  onStatusChange?: (status: PaymentStatus) => void;
}

interface PaymentStatusResponse {
  status: PaymentStatus;
}

const PaymentStatus = ({ paymentId, onStatusChange }: PaymentStatusProps) => {
  const { getPaymentStatus } = usePayment();
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setLoading(true);
        const response = await getPaymentStatus(paymentId);
        const paymentStatus = (response as unknown as PaymentStatusResponse)
          .status;
        setStatus(paymentStatus);
        onStatusChange?.(paymentStatus);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Error al verificar el estado del pago';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000); // Verificar cada 5 segundos

    return () => clearInterval(interval);
  }, [paymentId, getPaymentStatus, onStatusChange]);

  const getStatusIcon = () => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'failed':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'cancelled':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'refunded':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      default:
        return <Clock className="h-6 w-6 text-blue-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'paid':
        return 'Pago completado';
      case 'failed':
        return 'Pago fallido';
      case 'cancelled':
        return 'Pago cancelado';
      case 'refunded':
        return 'Pago reembolsado';
      default:
        return 'Pago pendiente';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        <AlertCircle className="h-6 w-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 p-4">
      {getStatusIcon()}
      <span className="text-sm font-medium">{getStatusText()}</span>
    </div>
  );
};

export default PaymentStatus;

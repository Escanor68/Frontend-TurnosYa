import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePayment } from '../../hooks/usePayment';
import type { PaymentStatus } from '../../types/payment';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

const PaymentWebhook = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getPaymentStatus } = usePayment();
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const externalReference = searchParams.get('external_reference');

    if (!paymentId || !externalReference) {
      setError('Parámetros de pago inválidos');
      setLoading(false);
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await getPaymentStatus(paymentId);
        setStatus(response.status as PaymentStatus);

        // Redirigir según el estado del pago
        if (response.status === 'paid') {
          toast.success('¡Pago completado con éxito!');
          setTimeout(() => {
            navigate('/bookings');
          }, 2000);
        } else if (
          response.status === 'failed' ||
          response.status === 'cancelled'
        ) {
          toast.error('El pago no pudo ser procesado');
          setTimeout(() => {
            navigate('/bookings');
          }, 2000);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Error al verificar el estado del pago';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [searchParams, getPaymentStatus, navigate]);

  const getStatusIcon = () => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="h-12 w-12 text-green-500" />;
      case 'failed':
      case 'cancelled':
        return <XCircle className="h-12 w-12 text-red-500" />;
      default:
        return <Clock className="h-12 w-12 text-blue-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'paid':
        return '¡Pago completado con éxito!';
      case 'failed':
        return 'El pago no pudo ser procesado';
      case 'cancelled':
        return 'El pago fue cancelado';
      default:
        return 'Verificando estado del pago...';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando estado del pago...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="mt-4 text-red-600">{error}</p>
          <button
            onClick={() => navigate('/bookings')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Volver a reservas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {getStatusIcon()}
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          {getStatusText()}
        </h2>
        <p className="mt-2 text-gray-600">
          Serás redirigido automáticamente en unos segundos...
        </p>
      </div>
    </div>
  );
};

export default PaymentWebhook;

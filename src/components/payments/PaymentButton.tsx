import { useState } from 'react';
import { usePayment } from '../../hooks/usePayment';
import { CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';

interface PaymentButtonProps {
  bookingId: string;
  amount: number;
  onSuccess?: () => void;
  onError?: () => void;
}

const PaymentButton = ({
  bookingId,
  amount,
  onSuccess,
  onError,
}: PaymentButtonProps) => {
  const { createPaymentPreference } = usePayment();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { initPoint } = await createPaymentPreference(bookingId);
      window.location.href = initPoint;
      onSuccess?.();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al iniciar el pago';
      toast.error(message);
      onError?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        <>
          <CreditCard className="h-5 w-5 mr-2" />
          Pagar ${amount}
        </>
      )}
    </button>
  );
};

export default PaymentButton;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaymentSummary from './PaymentSummary';
import PaymentButton from './PaymentButton';
import { usePayment } from '../../hooks/usePayment';

interface PaymentFormProps {
  bookingId: string;
  fieldName: string;
  date: string;
  time: string;
  duration: number;
  players: number;
  amount: number;
  additionalServices?: {
    name: string;
    price: number;
  }[];
}

const PaymentForm = ({
  bookingId,
  fieldName,
  date,
  time,
  duration,
  players,
  amount,
  additionalServices = [],
}: PaymentFormProps) => {
  const navigate = useNavigate();
  const { createPaymentPreference } = usePayment();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { initPoint } = await createPaymentPreference(bookingId, amount);
      window.location.href = initPoint;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al iniciar el pago';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/bookings');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Confirmar Pago
          </h2>

          <PaymentSummary
            fieldName={fieldName}
            date={date}
            time={time}
            duration={duration}
            players={players}
            amount={amount}
            additionalServices={additionalServices}
          />

          <div className="mt-6 space-y-4">
            <PaymentButton
              bookingId={bookingId}
              amount={amount}
              onSuccess={handlePayment}
              onError={() => toast.error('Error al procesar el pago')}
            />

            <button
              onClick={handleCancel}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Al realizar el pago, serás redirigido a Mercado Pago para
              completar la transacción de forma segura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;

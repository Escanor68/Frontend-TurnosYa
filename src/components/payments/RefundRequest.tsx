import { useState } from 'react';
import { usePayment } from '../../context/PaymentContext';
import { AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

interface RefundRequestProps {
  paymentId: string;
  amount: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const RefundRequest = ({
  paymentId,
  amount,
  onSuccess,
  onCancel,
}: RefundRequestProps) => {
  const { requestRefund } = usePayment();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error('Por favor, ingresa un motivo para el reembolso');
      return;
    }

    try {
      setLoading(true);
      await requestRefund(paymentId, reason);
      toast.success('Solicitud de reembolso enviada correctamente');
      onSuccess?.();
    } catch {
      toast.error('Error al solicitar el reembolso');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-start mb-6">
        <AlertCircle className="h-6 w-6 text-yellow-500 mr-3" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Solicitar Reembolso
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Monto a reembolsar: ${amount}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700"
          >
            Motivo del reembolso
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            placeholder="Describe el motivo de tu solicitud de reembolso..."
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Solicitar Reembolso'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RefundRequest;

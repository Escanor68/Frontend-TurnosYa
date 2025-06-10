import { useEffect, useState } from 'react';
import { usePayment } from '../../context/PaymentContext';
import { PaymentReport } from '../../types/payment';
import { Download, Mail, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

const PaymentHistory = () => {
  const {
    paymentHistory,
    loading,
    error,
    fetchPaymentHistory,
    downloadInvoice,
    sendInvoiceEmail,
  } = usePayment();
  const [downloading, setDownloading] = useState<string | null>(null);
  const [sending, setSending] = useState<string | null>(null);

  useEffect(() => {
    fetchPaymentHistory();
  }, [fetchPaymentHistory]);

  const handleDownload = async (paymentId: string) => {
    try {
      setDownloading(paymentId);
      await downloadInvoice(paymentId);
      toast.success('Factura descargada correctamente');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al descargar la factura';
      toast.error(message);
    } finally {
      setDownloading(null);
    }
  };

  const handleSendEmail = async (paymentId: string) => {
    try {
      setSending(paymentId);
      await sendInvoiceEmail(paymentId);
      toast.success('Factura enviada correctamente');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al enviar la factura';
      toast.error(message);
    } finally {
      setSending(null);
    }
  };

  const getStatusStyles = (status: PaymentReport['status']) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REFUNDED':
        return 'bg-gray-100 text-gray-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: PaymentReport['status']) => {
    switch (status) {
      case 'PAID':
        return 'Pagado';
      case 'PENDING':
        return 'Pendiente';
      case 'REFUNDED':
        return 'Reembolsado';
      case 'CANCELLED':
        return 'Cancelado';
      case 'FAILED':
        return 'Fallido';
      default:
        return status;
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
        <span>{error}</span>
      </div>
    );
  }

  if (paymentHistory.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">No hay pagos registrados</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Historial de Pagos
          </h2>
          <button
            onClick={() => fetchPaymentHistory()}
            className="p-2 text-gray-400 hover:text-gray-500"
            title="Actualizar historial"
            aria-label="Actualizar historial"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(
                        payment.status
                      )}`}
                    >
                      {getStatusText(payment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleDownload(payment.id)}
                        disabled={downloading === payment.id}
                        className="text-gray-400 hover:text-gray-500"
                        title="Descargar factura"
                        aria-label="Descargar factura"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleSendEmail(payment.id)}
                        disabled={sending === payment.id}
                        className="text-gray-400 hover:text-gray-500"
                        title="Enviar factura por email"
                        aria-label="Enviar factura por email"
                      >
                        <Mail className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;

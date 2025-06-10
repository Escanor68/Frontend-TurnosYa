import { useMemo } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface PaymentSummaryProps {
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

const PaymentSummary = ({
  fieldName,
  date,
  time,
  duration,
  players,
  amount,
  additionalServices = [],
}: PaymentSummaryProps) => {
  const totalAmount = useMemo(() => {
    const servicesTotal = additionalServices.reduce(
      (sum, service) => sum + service.price,
      0
    );
    return amount + servicesTotal;
  }, [amount, additionalServices]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Resumen del Pago
      </h3>

      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">{fieldName}</p>
            <p className="text-sm text-gray-500">Cancha</p>
          </div>
        </div>

        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">{date}</p>
            <p className="text-sm text-gray-500">Fecha</p>
          </div>
        </div>

        <div className="flex items-start">
          <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {time} ({duration} horas)
            </p>
            <p className="text-sm text-gray-500">Horario</p>
          </div>
        </div>

        <div className="flex items-start">
          <Users className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {players} jugadores
            </p>
            <p className="text-sm text-gray-500">Cantidad de jugadores</p>
          </div>
        </div>

        {additionalServices.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Servicios adicionales
            </h4>
            <ul className="space-y-2">
              {additionalServices.map((service, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span className="text-gray-500">{service.name}</span>
                  <span className="text-gray-900">${service.price}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <span className="text-base font-medium text-gray-900">Total</span>
            <span className="text-base font-medium text-gray-900">
              ${totalAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;

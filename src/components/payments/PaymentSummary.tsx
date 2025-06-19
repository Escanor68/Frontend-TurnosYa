import React, { useMemo } from 'react';
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

const PaymentSummary = React.memo(
  ({
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

    const formattedDate = useMemo(() => {
      return new Date(date).toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }, [date]);

    const formattedTime = useMemo(() => {
      return new Date(`2000-01-01T${time}`).toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }, [time]);

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
              <p className="text-sm font-medium text-gray-900">
                {formattedDate}
              </p>
              <p className="text-sm text-gray-500">Fecha</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {formattedTime} ({duration} horas)
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
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Servicios Adicionales
              </h4>
              <div className="space-y-2">
                {additionalServices.map((service, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{service.name}</span>
                    <span className="text-gray-900">${service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-emerald-600">
                ${totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PaymentSummary.displayName = 'PaymentSummary';

export default PaymentSummary;

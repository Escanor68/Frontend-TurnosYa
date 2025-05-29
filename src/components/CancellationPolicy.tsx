'use client';

import type React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface CancellationPolicyProps {
  variant?: 'full' | 'compact';
}

const CancellationPolicy: React.FC<CancellationPolicyProps> = ({
  variant = 'full',
}) => {
  return (
    <div
      className={`${
        variant === 'full' ? 'bg-red-50' : 'bg-amber-50'
      } p-4 rounded-lg`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {variant === 'full' ? (
            <AlertTriangle className="h-5 w-5 text-red-500" />
          ) : (
            <Info className="h-5 w-5 text-amber-500" />
          )}
        </div>
        <div className="ml-3">
          <h3
            className={`text-sm font-medium ${
              variant === 'full' ? 'text-red-800' : 'text-amber-800'
            }`}
          >
            Política de cancelación
          </h3>
          {variant === 'full' ? (
            <div
              className={`text-sm ${
                variant === 'full' ? 'text-red-700' : 'text-amber-700'
              } mt-1`}
            >
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Las cancelaciones realizadas con más de 24 horas de
                  anticipación reciben reembolso completo.
                </li>
                <li>
                  Las cancelaciones realizadas el mismo día de la reserva
                  recibirán un reembolso del 50% del valor.
                </li>
                <li>
                  No se permite cancelar una reserva una vez que haya comenzado
                  el horario reservado.
                </li>
              </ul>
            </div>
          ) : (
            <p className="text-sm text-amber-700 mt-1">
              Cancelaciones en el día: reembolso del 50%
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;

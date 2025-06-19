'use client';

import type React from 'react';
import { Plus, Minus, Calendar } from 'lucide-react';

interface DayRecurrenceSelectorProps {
  value: string;
  count: number;
  onChange: (value: string, count: number) => void;
}

const DayRecurrenceSelector: React.FC<DayRecurrenceSelectorProps> = ({
  value,
  count,
  onChange,
}) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value, count);
  };

  const handleCountChange = (increment: boolean) => {
    const newCount = increment
      ? Math.min(count + 1, 12)
      : Math.max(count - 1, 2);
    onChange(value, newCount);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Repetir reserva
        </label>
        <select
          value={value}
          onChange={handleValueChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          aria-label="Seleccionar día de la semana para repetición de reserva"
        >
          <option value="none">Sin repetición</option>
          <option value="monday">Todos los lunes</option>
          <option value="tuesday">Todos los martes</option>
          <option value="wednesday">Todos los miércoles</option>
          <option value="thursday">Todos los jueves</option>
          <option value="friday">Todos los viernes</option>
          <option value="saturday">Todos los sábados</option>
          <option value="sunday">Todos los domingos</option>
        </select>
      </div>

      {value && value !== 'none' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de semanas
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => handleCountChange(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 h-8 w-8 rounded-l-lg flex items-center justify-center"
              disabled={count <= 2}
              aria-label="Reducir número de semanas"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="h-8 px-4 flex items-center justify-center border-t border-b border-gray-300 bg-white">
              {count}
            </div>
            <button
              type="button"
              onClick={() => handleCountChange(true)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 h-8 w-8 rounded-r-lg flex items-center justify-center"
              disabled={count >= 12}
              aria-label="Aumentar número de semanas"
            >
              <Plus className="h-4 w-4" />
            </button>
            <span className="ml-3 text-sm text-gray-600">semanas</span>
          </div>
        </div>
      )}

      {value && value !== 'none' && (
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center text-sm text-blue-700">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            <span>
              Se crearán reservas para los próximos {count}{' '}
              {value === 'monday'
                ? 'lunes'
                : value === 'tuesday'
                ? 'martes'
                : value === 'wednesday'
                ? 'miércoles'
                : value === 'thursday'
                ? 'jueves'
                : value === 'friday'
                ? 'viernes'
                : value === 'saturday'
                ? 'sábados'
                : 'domingos'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayRecurrenceSelector;

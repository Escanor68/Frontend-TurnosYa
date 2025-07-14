'use client';

import React, { useMemo, useCallback } from 'react';
import { Plus, Minus, Calendar } from 'lucide-react';

interface DayRecurrenceSelectorProps {
  value: string;
  count: number;
  onChange: (value: string, count: number) => void;
}

const DayRecurrenceSelector: React.FC<DayRecurrenceSelectorProps> = React.memo(
  ({ value, count, onChange }) => {
    const handleValueChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value, count);
      },
      [onChange, count]
    );

    const handleCountChange = useCallback(
      (increment: boolean) => {
        const newCount = increment
          ? Math.min(count + 1, 12)
          : Math.max(count - 1, 2);
        onChange(value, newCount);
      },
      [count, value, onChange]
    );

    const isMinCount = useMemo(() => count <= 2, [count]);
    const isMaxCount = useMemo(() => count >= 12, [count]);

    const dayLabel = useMemo(() => {
      const dayMap: Record<string, string> = {
        monday: 'lunes',
        tuesday: 'martes',
        wednesday: 'miércoles',
        thursday: 'jueves',
        friday: 'viernes',
        saturday: 'sábados',
        sunday: 'domingos',
      };
      return dayMap[value] || '';
    }, [value]);

    // Memoizar las opciones del select para evitar re-renders
    const selectOptions = useMemo(
      () => [
        { value: 'none', label: 'Sin repetición' },
        { value: 'monday', label: 'Todos los lunes' },
        { value: 'tuesday', label: 'Todos los martes' },
        { value: 'wednesday', label: 'Todos los miércoles' },
        { value: 'thursday', label: 'Todos los jueves' },
        { value: 'friday', label: 'Todos los viernes' },
        { value: 'saturday', label: 'Todos los sábados' },
        { value: 'sunday', label: 'Todos los domingos' },
      ],
      []
    );

    const showRecurrenceInfo = useMemo(
      () => value && value !== 'none',
      [value]
    );

    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
            Repetir reserva
          </label>
          <select
            value={value}
            onChange={handleValueChange}
            className="w-full p-3 sm:p-2 border border-gray-300 rounded-md text-base sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            aria-label="Seleccionar día de la semana para repetición de reserva"
          >
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {showRecurrenceInfo && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              Número de semanas
            </label>
            <div className="flex items-center flex-wrap gap-2 sm:gap-0">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleCountChange(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 h-10 w-10 sm:h-8 sm:w-8 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isMinCount}
                  aria-label="Reducir número de semanas"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="h-10 px-4 sm:h-8 sm:px-4 flex items-center justify-center border-t border-b border-gray-300 bg-white min-w-[60px] sm:min-w-[50px] text-base sm:text-sm font-medium">
                  {count}
                </div>
                <button
                  type="button"
                  onClick={() => handleCountChange(true)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 h-10 w-10 sm:h-8 sm:w-8 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isMaxCount}
                  aria-label="Aumentar número de semanas"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-gray-600 ml-0 sm:ml-3">
                semanas
              </span>
            </div>
          </div>
        )}

        {showRecurrenceInfo && (
          <div className="bg-blue-50 p-4 sm:p-3 rounded-lg border border-blue-100">
            <div className="flex items-start sm:items-center text-sm text-blue-700">
              <Calendar className="h-4 w-4 mr-2 text-blue-500 mt-0.5 sm:mt-0 flex-shrink-0" />
              <span className="leading-relaxed">
                Se crearán reservas para los próximos {count} {dayLabel}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DayRecurrenceSelector.displayName = 'DayRecurrenceSelector';

export default DayRecurrenceSelector;

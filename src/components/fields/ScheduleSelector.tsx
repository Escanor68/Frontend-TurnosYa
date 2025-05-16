import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface ScheduleSelectorProps {
  date: string;
  timeSlots: TimeSlot[];
  selectedSlot: string | null;
  onSelectSlot: (slotId: string) => void;
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({
  date,
  timeSlots,
  selectedSlot,
  onSelectSlot,
}) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Clock className="h-5 w-5 text-emerald-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          Horarios disponibles para {new Date(date).toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {timeSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => slot.available && onSelectSlot(slot.id)}
            disabled={!slot.available}
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              selectedSlot === slot.id
                ? 'bg-emerald-600 text-white'
                : slot.available
                ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {slot.time}
            {!slot.available && <div className="text-xs mt-1">(Ocupado)</div>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScheduleSelector;
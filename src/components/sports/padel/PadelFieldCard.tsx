import React from 'react';
import { MapPin, Star, Clock, Users, DollarSign } from 'lucide-react';
import type { PadelField } from '../../../types/sports/padel';

interface PadelFieldCardProps {
  field: PadelField;
  onFieldClick: (fieldId: string) => void;
  className?: string;
}

const PadelFieldCard: React.FC<PadelFieldCardProps> = ({
  field,
  onFieldClick,
  className = '',
}) => {
  const handleClick = () => {
    onFieldClick(field.id);
  };

  const getFieldTypeLabel = (type: string) => {
    switch (type) {
      case 'paddle-single':
        return 'Single';
      case 'paddle-doubles':
        return 'Dobles';
      default:
        return type;
    }
  };

  const getSurfaceLabel = (surface: string) => {
    switch (surface) {
      case 'artificial':
        return 'Sintético';
      case 'cement':
        return 'Cemento';
      case 'grass':
        return 'Césped';
      default:
        return surface;
    }
  };

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {/* Imagen del campo */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-6xl">🎾</div>
        </div>
        <div className="absolute top-3 right-3">
          <button
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Agregar a favoritos"
          >
            <Star className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Información del campo */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {field.name}
            </h3>
            <p className="text-sm text-gray-600">
              {getFieldTypeLabel(field.type)}
            </p>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">4.9</span>
          </div>
        </div>

        {/* Características del campo */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{getSurfaceLabel(field.surface)}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>
              {field.type === 'paddle-single' && '1 vs 1'}
              {field.type === 'paddle-doubles' && '2 vs 2'}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>Disponible ahora</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {field.hasGlass && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Cristal
            </span>
          )}
          {field.hasNet && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Red
            </span>
          )}
          {field.hasLights && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Iluminación
            </span>
          )}
          {field.hasChangingRooms && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              Vestuarios
            </span>
          )}
          {field.hasEquipmentRental && (
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
              Alquiler equipos
            </span>
          )}
        </div>

        {/* Precio y acción */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-lg font-semibold text-green-600">$1,800</span>
            <span className="text-sm text-gray-500 ml-1">/hora</span>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PadelFieldCard;

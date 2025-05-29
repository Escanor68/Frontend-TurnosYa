import React from 'react';
import { Clock, Users, Star, Calendar } from 'lucide-react';
import type { SportField } from '../../types';
import FieldLocation from './FieldLocation';

interface FieldDetailsProps {
  field: SportField;
  onBookingClick: () => void;
}

const FieldDetails: React.FC<FieldDetailsProps> = ({
  field,
  onBookingClick,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imágenes y detalles principales */}
        <div className="space-y-6">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={field.image || '/placeholder.svg'}
              alt={field.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {field.name}
            </h1>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-3 text-emerald-600" />
                <span>Duración: {field.duration} minutos</span>
              </div>

              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-3 text-emerald-600" />
                <span>
                  Tipo: {field.type} ({field.players} jugadores)
                </span>
              </div>

              <div className="flex items-center text-gray-600">
                <Star className="h-5 w-5 mr-3 text-emerald-600" />
                <span>Calificación: {field.rating}/5</span>
              </div>

              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3 text-emerald-600" />
                <span>Horario: {field.schedule}</span>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="text-2xl font-bold text-emerald-600">
                  ${field.price}
                </div>
                <p className="text-sm text-gray-500">por turno</p>
              </div>
            </div>

            <button
              onClick={onBookingClick}
              className="w-full mt-6 py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Reservar Ahora
            </button>
          </div>

          {field.description && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Descripción
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {field.description}
              </p>
            </div>
          )}
        </div>

        {/* Ubicación y mapa */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Ubicación
            </h2>
            <FieldLocation field={field} />
          </div>

          {field.amenities && field.amenities.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Servicios
              </h2>
              <ul className="grid grid-cols-2 gap-3">
                {field.amenities.map((amenity) => (
                  <li
                    key={amenity.id}
                    className="flex items-center text-gray-600"
                  >
                    <span className="mr-2">{amenity.icon}</span>
                    {amenity.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {field.rules && field.rules.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Reglas
              </h2>
              <ul className="space-y-2">
                {field.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span className="text-gray-600">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FieldDetails;

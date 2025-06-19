import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PadelFieldCard from '../../../components/sports/padel/PadelFieldCard';
import type { PadelField } from '../../../types/sports/padel';

const PadelHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState<PadelField[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSurface, setSelectedSurface] = useState<string>('all');

  // Mock data - en producción vendría de la API
  useEffect(() => {
    const mockFields: PadelField[] = [
      {
        id: '1',
        name: 'Cancha Pádel Premium',
        type: 'paddle-doubles',
        surface: 'artificial',
        size: { width: 10, length: 20 },
        amenities: ['Cristal', 'Red', 'Iluminación'],
        hasGlass: true,
        hasNet: true,
        hasLights: true,
        hasChangingRooms: true,
        hasEquipmentRental: true,
      },
      {
        id: '2',
        name: 'Pádel Single Elite',
        type: 'paddle-single',
        surface: 'cement',
        size: { width: 8, length: 16 },
        amenities: ['Cristal', 'Red', 'Vestuarios'],
        hasGlass: true,
        hasNet: true,
        hasLights: false,
        hasChangingRooms: true,
        hasEquipmentRental: false,
      },
      {
        id: '3',
        name: 'Club Pádel Indoor',
        type: 'paddle-doubles',
        surface: 'artificial',
        size: { width: 10, length: 20 },
        amenities: ['Cristal', 'Red', 'Iluminación', 'Alquiler equipos'],
        hasGlass: true,
        hasNet: true,
        hasLights: true,
        hasChangingRooms: true,
        hasEquipmentRental: true,
      },
    ];

    setTimeout(() => {
      setFields(mockFields);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFieldClick = (fieldId: string) => {
    navigate(`/padel/fields/${fieldId}`);
  };

  const filteredFields = fields.filter((field) => {
    if (selectedType !== 'all' && field.type !== selectedType) return false;
    if (selectedSurface !== 'all' && field.surface !== selectedSurface)
      return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🎾 Pádel</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Disfruta del pádel en las mejores canchas con cristal, alquiler de
          equipos y torneos para todos los niveles.
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Juego
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Filtrar por tipo de juego de pádel"
            >
              <option value="all">Todos los tipos</option>
              <option value="paddle-single">Single</option>
              <option value="paddle-doubles">Dobles</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Superficie
            </label>
            <select
              value={selectedSurface}
              onChange={(e) => setSelectedSurface(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Filtrar por superficie de cancha de pádel"
            >
              <option value="all">Todas las superficies</option>
              <option value="artificial">Sintético</option>
              <option value="cement">Cemento</option>
              <option value="grass">Césped</option>
            </select>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {fields.length}
          </div>
          <div className="text-sm text-gray-600">Canchas disponibles</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">8</div>
          <div className="text-sm text-gray-600">Torneos activos</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">89</div>
          <div className="text-sm text-gray-600">Jugadores registrados</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">45</div>
          <div className="text-sm text-gray-600">Partidos hoy</div>
        </div>
      </div>

      {/* Lista de campos */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Canchas Disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFields.map((field) => (
            <PadelFieldCard
              key={field.id}
              field={field}
              onFieldClick={handleFieldClick}
            />
          ))}
        </div>
      </div>

      {/* Secciones adicionales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rankings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🏆 Rankings
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-lg font-bold text-yellow-500 mr-3">
                  1
                </span>
                <div>
                  <div className="font-medium">Carlos Martínez</div>
                  <div className="text-sm text-gray-600">
                    Single • 1,250 puntos
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">+15</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-400 mr-3">2</span>
                <div>
                  <div className="font-medium">Ana García</div>
                  <div className="text-sm text-gray-600">
                    Dobles • 1,180 puntos
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">+8</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-lg font-bold text-orange-500 mr-3">
                  3
                </span>
                <div>
                  <div className="font-medium">Luis Rodríguez</div>
                  <div className="text-sm text-gray-600">
                    Single • 1,120 puntos
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">-5</div>
            </div>
          </div>
        </div>

        {/* Torneos */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Torneos Próximos
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Torneo de Verano</div>
                <div className="text-sm text-gray-600">
                  Single • Inicia en 5 días
                </div>
                <div className="text-xs text-emerald-600">$5,000 premio</div>
              </div>
              <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm">
                Inscribirse
              </button>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Liga Amistad</div>
                <div className="text-sm text-gray-600">
                  Dobles • Inicia en 12 días
                </div>
                <div className="text-xs text-emerald-600">$3,000 premio</div>
              </div>
              <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm">
                Inscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios adicionales */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          🛠️ Servicios Adicionales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-3xl mb-2">🎾</div>
            <h4 className="font-medium mb-2">Alquiler de Equipos</h4>
            <p className="text-sm text-gray-600">
              Raquetas y pelotas disponibles
            </p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-3xl mb-2">👨‍🏫</div>
            <h4 className="font-medium mb-2">Clases Particulares</h4>
            <p className="text-sm text-gray-600">Entrenadores certificados</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-3xl mb-2">📊</div>
            <h4 className="font-medium mb-2">Análisis de Juego</h4>
            <p className="text-sm text-gray-600">Estadísticas y videos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PadelHomePage;

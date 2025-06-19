import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FootballFieldCard from '../../../components/sports/football/FootballFieldCard';
import type { FootballField } from '../../../types/sports/football';

const FootballHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState<FootballField[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSurface, setSelectedSurface] = useState<string>('all');

  // Mock data - en producción vendría de la API
  useEffect(() => {
    const mockFields: FootballField[] = [
      {
        id: '1',
        name: 'Cancha Central Fútbol 5',
        type: 'soccer-5',
        surface: 'artificial',
        size: { width: 25, length: 40 },
        amenities: ['Iluminación', 'Vestuarios'],
        hasGoals: true,
        hasLines: true,
        hasLights: true,
        hasChangingRooms: true,
      },
      {
        id: '2',
        name: 'Estadio Fútbol 11',
        type: 'soccer-11',
        surface: 'grass',
        size: { width: 68, length: 105 },
        amenities: ['Iluminación', 'Vestuarios', 'Gradas'],
        hasGoals: true,
        hasLines: true,
        hasLights: true,
        hasChangingRooms: true,
      },
      {
        id: '3',
        name: 'Cancha Fútbol 7 Premium',
        type: 'soccer-7',
        surface: 'artificial',
        size: { width: 35, length: 55 },
        amenities: ['Iluminación', 'Vestuarios', 'Cafetería'],
        hasGoals: true,
        hasLines: true,
        hasLights: true,
        hasChangingRooms: true,
      },
    ];

    setTimeout(() => {
      setFields(mockFields);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFieldClick = (fieldId: string) => {
    navigate(`/football/fields/${fieldId}`);
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">⚽ Fútbol</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Encuentra las mejores canchas de fútbol para jugar con amigos, formar
          equipos o participar en torneos competitivos.
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Cancha
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Filtrar por tipo de cancha de fútbol"
            >
              <option value="all">Todos los tipos</option>
              <option value="soccer-5">Fútbol 5</option>
              <option value="soccer-7">Fútbol 7</option>
              <option value="soccer-11">Fútbol 11</option>
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
              aria-label="Filtrar por superficie de cancha"
            >
              <option value="all">Todas las superficies</option>
              <option value="grass">Césped</option>
              <option value="artificial">Sintético</option>
              <option value="indoor">Indoor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-emerald-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-emerald-600">
            {fields.length}
          </div>
          <div className="text-sm text-gray-600">Canchas disponibles</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-sm text-gray-600">Torneos activos</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">156</div>
          <div className="text-sm text-gray-600">Equipos registrados</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">89</div>
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
            <FootballFieldCard
              key={field.id}
              field={field}
              onFieldClick={handleFieldClick}
            />
          ))}
        </div>
      </div>

      {/* Secciones adicionales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Torneos */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🏆 Torneos Activos
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Liga de Verano 2024</div>
                <div className="text-sm text-gray-600">
                  8 equipos • Finaliza en 15 días
                </div>
              </div>
              <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm">
                Ver
              </button>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Copa Amistad</div>
                <div className="text-sm text-gray-600">
                  16 equipos • Inicia en 3 días
                </div>
              </div>
              <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm">
                Ver
              </button>
            </div>
          </div>
        </div>

        {/* Equipos destacados */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            👥 Equipos Destacados
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-emerald-600 font-bold">L</span>
              </div>
              <div className="flex-1">
                <div className="font-medium">Los Leones</div>
                <div className="text-sm text-gray-600">
                  15 victorias • 3 derrotas
                </div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold">E</span>
              </div>
              <div className="flex-1">
                <div className="font-medium">Estrellas FC</div>
                <div className="text-sm text-gray-600">
                  12 victorias • 6 derrotas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballHomePage;

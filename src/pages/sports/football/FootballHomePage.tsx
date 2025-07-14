import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FootballFieldCard from '../../../components/sports/football/FootballFieldCard';
import { SkeletonFieldCard } from '../../../components/common/Skeleton';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <div className="h-12 bg-gray-200 rounded-lg mb-4 animate-pulse max-w-md mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse max-w-2xl mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse max-w-xl mx-auto"></div>
        </div>

        {/* Filtros Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Estadísticas Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 p-4 rounded-lg animate-pulse"
            >
              <div className="h-8 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* Cards Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded mb-6 animate-pulse max-w-xs"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonFieldCard key={index} />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          ⚽ Fútbol
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Encuentra las mejores canchas de fútbol para jugar con amigos, formar
          equipos o participar en torneos competitivos.
        </p>
      </motion.div>

      {/* Filtros */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Cancha
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base sm:text-sm transition-colors"
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
              className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base sm:text-sm transition-colors"
              aria-label="Filtrar por superficie de cancha"
            >
              <option value="all">Todas las superficies</option>
              <option value="grass">Césped</option>
              <option value="artificial">Sintético</option>
              <option value="indoor">Indoor</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas rápidas */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8"
      >
        <motion.div
          variants={itemVariants}
          className="bg-emerald-50 p-3 sm:p-4 rounded-lg text-center"
        >
          <div className="text-xl sm:text-2xl font-bold text-emerald-600">
            {fields.length}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            Canchas disponibles
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-blue-50 p-3 sm:p-4 rounded-lg text-center"
        >
          <div className="text-xl sm:text-2xl font-bold text-blue-600">12</div>
          <div className="text-xs sm:text-sm text-gray-600">
            Torneos activos
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-purple-50 p-3 sm:p-4 rounded-lg text-center"
        >
          <div className="text-xl sm:text-2xl font-bold text-purple-600">
            156
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            Equipos registrados
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-orange-50 p-3 sm:p-4 rounded-lg text-center"
        >
          <div className="text-xl sm:text-2xl font-bold text-orange-600">
            89
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Partidos hoy</div>
        </motion.div>
      </motion.div>

      {/* Lista de campos */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Canchas Disponibles
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedType}-${selectedSurface}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredFields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FootballFieldCard
                  field={field}
                  onFieldClick={handleFieldClick}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Secciones adicionales */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
      >
        {/* Torneos */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-sm p-4 sm:p-6"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            🏆 Torneos Activos
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm sm:text-base">
                  Liga de Verano 2024
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  8 equipos • Finaliza en 15 días
                </div>
              </div>
              <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-xs sm:text-sm ml-2 transition-colors hover:bg-emerald-700">
                Ver
              </button>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm sm:text-base">
                  Copa Amistad
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  16 equipos • Inicia en 3 días
                </div>
              </div>
              <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-xs sm:text-sm ml-2 transition-colors hover:bg-emerald-700">
                Ver
              </button>
            </div>
          </div>
        </motion.div>

        {/* Equipos destacados */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-sm p-4 sm:p-6"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            👥 Equipos Destacados
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-emerald-600 font-bold text-sm sm:text-base">
                  L
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm sm:text-base">
                  Los Leones
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  15 victorias • 3 derrotas
                </div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm sm:text-base">
                  E
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm sm:text-base">
                  Estrellas FC
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  12 victorias • 6 derrotas
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FootballHomePage;

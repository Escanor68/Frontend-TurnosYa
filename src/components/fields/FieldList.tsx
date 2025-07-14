import React, { useState, useEffect, useCallback, useMemo } from 'react';
import FieldCard from './FieldCard';
import { SkeletonFieldCard } from '../common/Skeleton';
import { FadeTransition } from '../common/Transition';
import {
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Search,
  MapPin,
  Star,
  DollarSign,
  RefreshCw,
} from 'lucide-react';

interface Field {
  id: string | number;
  name: string;
  location: string;
  type: string;
  rating: number;
  image: string;
  duration: number;
  players: string;
  price: number;
  amenities: string[];
}

interface FieldListProps {
  fields: Field[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'rating' | 'price' | 'location';
type SortOrder = 'asc' | 'desc';

const FieldList: React.FC<FieldListProps> = ({
  fields,
  loading = false,
  error = null,
  onRetry,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Get unique field types for filter
  const fieldTypes = useMemo(() => {
    const types = fields.map((field) => field.type);
    return ['all', ...Array.from(new Set(types))];
  }, [fields]);

  // Filter and sort fields
  const filteredAndSortedFields = useMemo(() => {
    const filtered = fields.filter((field) => {
      const matchesSearch =
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || field.type === selectedType;
      const matchesPrice =
        field.price >= priceRange[0] && field.price <= priceRange[1];

      return matchesSearch && matchesType && matchesPrice;
    });

    // Sort fields
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'location':
          aValue = a.location.toLowerCase();
          bValue = b.location.toLowerCase();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [fields, searchTerm, selectedType, priceRange, sortBy, sortOrder]);

  const handleSort = useCallback(
    (option: SortOption) => {
      if (sortBy === option) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(option);
        setSortOrder('asc');
      }
    },
    [sortBy, sortOrder]
  );

  const handleRetry = useCallback(() => {
    onRetry?.();
  }, [onRetry]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedType('all');
    setPriceRange([0, 10000]);
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error al cargar canchas
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          {onRetry && (
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reintentar
            </button>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Skeleton */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <FadeTransition key={index} show={true} delay={index * 100}>
              <SkeletonFieldCard />
            </FadeTransition>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar canchas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              aria-label="Filtrar por tipo de cancha"
            >
              {fieldTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'Todos los tipos' : type}
                </option>
              ))}
            </select>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSort('name')}
                className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  sortBy === 'name'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>Nombre</span>
                {sortBy === 'name' &&
                  (sortOrder === 'asc' ? (
                    <SortAsc className="w-3 h-3 ml-1" />
                  ) : (
                    <SortDesc className="w-3 h-3 ml-1" />
                  ))}
              </button>

              <button
                onClick={() => handleSort('rating')}
                className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  sortBy === 'rating'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star className="w-3 h-3 mr-1" />
                <span>Rating</span>
                {sortBy === 'rating' &&
                  (sortOrder === 'asc' ? (
                    <SortAsc className="w-3 h-3 ml-1" />
                  ) : (
                    <SortDesc className="w-3 h-3 ml-1" />
                  ))}
              </button>

              <button
                onClick={() => handleSort('price')}
                className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  sortBy === 'price'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <DollarSign className="w-3 h-3 mr-1" />
                <span>Precio</span>
                {sortBy === 'price' &&
                  (sortOrder === 'asc' ? (
                    <SortAsc className="w-3 h-3 ml-1" />
                  ) : (
                    <SortDesc className="w-3 h-3 ml-1" />
                  ))}
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Vista de cuadrícula"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Vista de lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedType !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {filteredAndSortedFields.length} cancha
            {filteredAndSortedFields.length !== 1 ? 's' : ''} encontrada
            {filteredAndSortedFields.length !== 1 ? 's' : ''}
            {searchTerm && ` para "${searchTerm}"`}
          </p>
        </div>
      </div>

      {/* Fields Grid/List */}
      {filteredAndSortedFields.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron canchas
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? `No hay canchas que coincidan con "${searchTerm}"`
                : 'Intenta ajustar los filtros de búsqueda o ampliar el área de búsqueda.'}
            </p>
            {(searchTerm || selectedType !== 'all') && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`
          ${
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          } 
          ${className}
        `}
        >
          {filteredAndSortedFields.map((field, index) => (
            <FadeTransition key={field.id} show={isVisible} delay={index * 50}>
              <FieldCard {...field} />
            </FadeTransition>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(FieldList);

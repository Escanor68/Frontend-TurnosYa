import React, { useState, useEffect } from 'react';
import FieldCard from './FieldCard';
import { SkeletonFieldCard } from '../common/Skeleton';
import { FadeTransition } from '../common/Transition';
import VirtualList from '../common/VirtualList';

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
  useVirtualization?: boolean;
}

const FieldList: React.FC<FieldListProps> = ({
  fields,
  loading = false,
  error = null,
  onRetry,
  className = '',
  useVirtualization = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <FadeTransition key={index} show={true} delay={index * 100}>
            <SkeletonFieldCard />
          </FadeTransition>
        ))}
      </div>
    );
  }

  if (fields.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No se encontraron canchas
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Intenta ajustar los filtros de búsqueda.
          </p>
        </div>
      </div>
    );
  }

  if (useVirtualization) {
    return (
      <VirtualList
        items={fields}
        itemHeight={400}
        containerHeight={600}
        renderItem={(field: Field, index: number) => (
          <FadeTransition show={isVisible} delay={index * 100}>
            <FieldCard {...field} />
          </FadeTransition>
        )}
        className={className}
      />
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {fields.map((field, index) => (
        <FadeTransition key={field.id} show={isVisible} delay={index * 100}>
          <FieldCard {...field} />
        </FadeTransition>
      ))}
    </div>
  );
};

export default FieldList;

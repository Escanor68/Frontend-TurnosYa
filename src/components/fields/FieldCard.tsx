import React, { useCallback, useMemo } from 'react';
import {
  MapPin,
  Star,
  Clock,
  Users,
  DollarSign,
  Calendar,
  Heart,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Skeleton from '../common/Skeleton';
import { FadeTransition } from '../common/Transition';
import OptimizedImage from '../common/OptimizedImage';

interface FieldCardProps {
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
  loading?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string | number) => void;
}

const FieldCard: React.FC<FieldCardProps> = React.memo(
  ({
    id,
    name,
    location,
    type,
    rating,
    image,
    duration,
    players,
    price,
    amenities,
    loading = false,
    isFavorite = false,
    onToggleFavorite,
  }) => {
    const visibleAmenities = useMemo(() => {
      return amenities.slice(0, 3);
    }, [amenities]);

    const hasMoreAmenities = useMemo(() => {
      return amenities.length > 3;
    }, [amenities]);

    const amenitiesCount = useMemo(() => {
      return amenities.length - 3;
    }, [amenities]);

    const formattedPrice = useMemo(() => {
      return price.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
      });
    }, [price]);

    const handleLinkClick = useCallback(() => {
      // Analytics tracking could go here
      console.log(`Field ${id} clicked`);
    }, [id]);

    const handleImageLoad = useCallback(() => {
      // Analytics tracking could go here
      console.log(`Image loaded for field ${id}`);
    }, [id]);

    const handleImageError = useCallback(() => {
      // Analytics tracking could go here
      console.log(`Image error for field ${id}`);
    }, [id]);

    const handleFavoriteToggle = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite?.(id);
      },
      [id, onToggleFavorite]
    );

    if (loading) {
      return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <Skeleton variant="rectangular" height={200} className="w-full" />
          <div className="p-6">
            <Skeleton variant="text" height={24} className="mb-2" />
            <Skeleton variant="text" height={16} className="mb-4" />
            <Skeleton variant="text" height={16} className="mb-4" />
            <Skeleton variant="text" height={40} className="mb-4" />
            <Skeleton variant="rectangular" height={48} className="w-full" />
          </div>
        </div>
      );
    }

    return (
      <FadeTransition show={true} delay={100}>
        <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <OptimizedImage
              src={image}
              alt={`Cancha ${name}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              fallbackSrc="/placeholder.svg"
              placeholder={
                <Skeleton
                  variant="rectangular"
                  height={192}
                  className="w-full"
                />
              }
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Type Badge */}
            <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              {type}
            </div>

            {/* Favorite Button */}
            {onToggleFavorite && (
              <button
                onClick={handleFavoriteToggle}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
                  isFavorite
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
                aria-label={
                  isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
                }
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
                />
              </button>
            )}

            {/* Rating Badge */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{rating}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title and Location */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-200">
                {name}
              </h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm">{location}</span>
              </div>
            </div>

            {/* Amenities */}
            {visibleAmenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {visibleAmenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-200"
                  >
                    {amenity}
                  </span>
                ))}
                {hasMoreAmenities && (
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                    +{amenitiesCount}
                  </span>
                )}
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm font-medium">{duration} min</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm font-medium">{players}</span>
              </div>
              <div className="flex items-center text-emerald-600 font-bold">
                <DollarSign className="w-4 h-4 mr-1" />
                <span className="text-lg">{formattedPrice}</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to={`/fields/${id}`}
              onClick={handleLinkClick}
              className="group/btn block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
              aria-label={`Ver disponibilidad de ${name}`}
            >
              <Calendar className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
              <span>Ver Disponibilidad</span>
            </Link>
          </div>
        </div>
      </FadeTransition>
    );
  }
);

FieldCard.displayName = 'FieldCard';

export default FieldCard;

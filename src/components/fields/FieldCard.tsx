import React, { useCallback, useMemo } from 'react';
import { MapPin, Star, Clock, Users, DollarSign } from 'lucide-react';
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
      return price.toLocaleString();
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

    if (loading) {
      return <Skeleton variant="card" className="h-96" />;
    }

    return (
      <FadeTransition show={true} delay={100}>
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="relative h-48">
            <OptimizedImage
              src={image}
              alt={name}
              className="w-full h-full object-cover"
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
            <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {type}
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-gray-700 font-medium ml-1">{rating}</span>
              </div>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2 text-gray-500" />
              <span>{location}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {visibleAmenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
              {hasMoreAmenities && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  +{amenitiesCount}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2 text-gray-500" />
                <span>{duration} min</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2 text-gray-500" />
                <span>{players}</span>
              </div>
              <div className="flex items-center text-emerald-600 font-bold text-xl">
                <DollarSign className="h-5 w-5 mr-1" />
                <span>{formattedPrice}</span>
              </div>
            </div>
            <Link
              to={`/fields/${id}`}
              onClick={handleLinkClick}
              className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold py-3 rounded-lg transition-colors"
            >
              Ver Disponibilidad
            </Link>
          </div>
        </div>
      </FadeTransition>
    );
  }
);

FieldCard.displayName = 'FieldCard';

export default FieldCard;

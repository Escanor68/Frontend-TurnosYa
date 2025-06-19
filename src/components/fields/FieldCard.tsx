import React, { useCallback, useState } from 'react';
import { MapPin, Star, Clock, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import Skeleton from '../common/Skeleton';
import { FadeTransition } from '../common/Transition';

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
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleLinkClick = useCallback(() => {
      // Analytics tracking could go here
      console.log(`Field ${id} clicked`);
    }, [id]);

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
      setImageError(true);
      setImageLoaded(true);
    }, []);

    if (loading) {
      return <Skeleton variant="card" className="h-96" />;
    }

    return (
      <FadeTransition show={true} delay={100}>
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="relative h-48">
            {!imageLoaded && !imageError && (
              <Skeleton variant="rectangular" height={192} className="w-full" />
            )}
            <img
              src={
                imageError ? '/placeholder.svg' : image || '/placeholder.svg'
              }
              alt={name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
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
              {amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  +{amenities.length - 3}
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
                <span>{price.toLocaleString()}</span>
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

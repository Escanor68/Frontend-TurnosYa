import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Star,
  Clock,
  Users,
  DollarSign,
  Calendar,
  Heart,
  Eye,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Skeleton from '../common/Skeleton';
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
      console.log(`Field ${id} clicked`);
    }, [id]);

    const handleImageLoad = useCallback(() => {
      console.log(`Image loaded for field ${id}`);
    }, [id]);

    const handleImageError = useCallback(() => {
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
        <div className="card shadow-lg border-0 h-100">
          <Skeleton variant="rectangular" height={200} className="w-100" />
          <div className="card-body">
            <Skeleton variant="text" height={24} className="mb-2" />
            <Skeleton variant="text" height={16} className="mb-4" />
            <Skeleton variant="text" height={16} className="mb-4" />
            <Skeleton variant="text" height={40} className="mb-4" />
            <Skeleton variant="rectangular" height={48} className="w-100" />
          </div>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="card shadow-lg border-0 h-100 overflow-hidden"
      >
        {/* Image Container */}
        <div
          className="position-relative overflow-hidden"
          style={{ height: '200px' }}
        >
          <OptimizedImage
            src={image}
            alt={`Cancha ${name}`}
            className="w-100 h-100 object-fit-cover"
            fallbackSrc="/placeholder.svg"
            placeholder={
              <Skeleton variant="rectangular" height={200} className="w-100" />
            }
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Overlay Gradient */}
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-bottom from-transparent to-dark opacity-0 hover:opacity-75 transition-opacity duration-300"></div>

          {/* Type Badge */}
          <div className="position-absolute top-3 start-3">
            <span className="badge bg-success text-white px-3 py-2 fw-bold shadow">
              {type}
            </span>
          </div>

          {/* Favorite Button */}
          {onToggleFavorite && (
            <motion.button
              onClick={handleFavoriteToggle}
              className={`position-absolute top-3 end-3 btn btn-sm rounded-circle ${
                isFavorite
                  ? 'btn-danger shadow'
                  : 'btn-light bg-white bg-opacity-75 text-muted hover:btn-danger hover:text-white'
              }`}
              aria-label={
                isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
              }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                className={`${isFavorite ? 'text-white' : ''}`}
                size={16}
                fill={isFavorite ? 'currentColor' : 'none'}
              />
            </motion.button>
          )}

          {/* Rating Badge */}
          <div className="position-absolute bottom-3 end-3">
            <div className="badge bg-white bg-opacity-90 text-dark px-3 py-2 fw-bold d-flex align-items-center gap-1">
              <Star className="text-warning" size={14} fill="currentColor" />
              <span>{rating}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card-body d-flex flex-column">
          {/* Title and Location */}
          <div className="mb-3">
            <h5 className="card-title fw-bold text-dark mb-2 hover:text-success transition-colors">
              {name}
            </h5>
            <div className="d-flex align-items-center text-muted">
              <MapPin className="me-2" size={16} />
              <small>{location}</small>
            </div>
          </div>

          {/* Amenities */}
          {visibleAmenities.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mb-3">
              {visibleAmenities.map((amenity, index) => (
                <span
                  key={index}
                  className="badge bg-light text-dark border px-2 py-1 small"
                >
                  {amenity}
                </span>
              ))}
              {hasMoreAmenities && (
                <span className="badge bg-success text-white px-2 py-1 small">
                  +{amenitiesCount}
                </span>
              )}
            </div>
          )}

          {/* Info Grid */}
          <div className="row g-2 mb-4">
            <div className="col-4">
              <div className="d-flex align-items-center text-muted small">
                <Clock className="me-1" size={14} />
                <span className="fw-medium">{duration} min</span>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex align-items-center text-muted small">
                <Users className="me-1" size={14} />
                <span className="fw-medium">{players}</span>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex align-items-center text-success fw-bold">
                <DollarSign className="me-1" size={14} />
                <span>{formattedPrice}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto">
            <div className="d-grid gap-2">
              <Link
                to={`/fields/${id}`}
                onClick={handleLinkClick}
                className="btn btn-success fw-bold d-flex align-items-center justify-content-center gap-2"
                aria-label={`Ver disponibilidad de ${name}`}
              >
                <Calendar size={16} />
                Ver Disponibilidad
              </Link>

              <div className="d-flex gap-2">
                <Link
                  to={`/fields/${id}`}
                  className="btn btn-outline-primary flex-fill d-flex align-items-center justify-content-center gap-1"
                  aria-label={`Ver detalles de ${name}`}
                >
                  <Eye size={14} />
                  <span className="small">Detalles</span>
                </Link>
                <button
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                  aria-label={`Contactar sobre ${name}`}
                >
                  <Phone size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

FieldCard.displayName = 'FieldCard';

export default FieldCard;

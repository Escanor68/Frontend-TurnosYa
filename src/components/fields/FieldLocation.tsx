import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import Map from '../common/Map';
import type { SportField } from '../../types';

interface FieldLocationProps {
  field: SportField;
}

const FieldLocation: React.FC<FieldLocationProps> = ({ field }) => {
  const [userLocation, setUserLocation] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [distance, setDistance] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Obtener la ubicación del usuario si da permiso
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);

  React.useEffect(() => {
    // Calcular la distancia entre el usuario y la cancha cuando tengamos ambas ubicaciones
    if (userLocation && field.location.coordinates) {
      const calculateDistance = () => {
        const R = 6371; // Radio de la Tierra en kilómetros
        const lat1 = (userLocation.lat * Math.PI) / 180;
        const lat2 = (field.location.coordinates.lat * Math.PI) / 180;
        const deltaLat =
          ((field.location.coordinates.lat - userLocation.lat) * Math.PI) / 180;
        const deltaLng =
          ((field.location.coordinates.lng - userLocation.lng) * Math.PI) / 180;

        const a =
          Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(deltaLng / 2) *
            Math.sin(deltaLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        if (d < 1) {
          setDistance(`${Math.round(d * 1000)} metros`);
        } else {
          setDistance(`${d.toFixed(1)} km`);
        }
      };

      calculateDistance();
    }
  }, [userLocation, field.location.coordinates]);

  const openGoogleMaps = () => {
    if (field.location.coordinates) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${field.location.coordinates.lat},${field.location.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <MapPin className="h-5 w-5 text-emerald-600 mt-1" />
        <div>
          <h3 className="font-medium text-gray-900">{field.location.name}</h3>
          <p className="text-gray-600">{field.location.address}</p>
          <p className="text-gray-600">
            {field.location.city}, {field.location.province}
          </p>
          {distance && (
            <p className="text-sm text-emerald-600 mt-1 flex items-center">
              <Navigation className="h-4 w-4 mr-1" />A {distance} de tu
              ubicación
            </p>
          )}
        </div>
      </div>

      <div className="rounded-lg overflow-hidden shadow-md">
        <Map
          center={field.location.coordinates}
          markers={[
            {
              id: field.id,
              position: field.location.coordinates,
              title: field.name,
              address: field.location.address,
            },
          ]}
          zoom={15}
          height="300px"
        />
      </div>

      <button
        onClick={openGoogleMaps}
        className="w-full py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
      >
        <Navigation className="h-5 w-5 mr-2" />
        Cómo llegar
      </button>
    </div>
  );
};

export default FieldLocation;

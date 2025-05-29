import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

interface Field {
  id: string | number;
  name: string;
  location: Location;
}

interface MapViewProps {
  fields: Field[];
  center: Location;
  onFieldSelect?: (fieldId: string | number) => void;
}

const MapView: React.FC<MapViewProps> = ({ fields, center, onFieldSelect }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={13}
      options={options}
    >
      {fields.map((field) => (
        <Marker
          key={field.id}
          position={field.location}
          title={field.name}
          onClick={() => onFieldSelect?.(field.id)}
        />
      ))}
    </GoogleMap>
  );
};

export default MapView;

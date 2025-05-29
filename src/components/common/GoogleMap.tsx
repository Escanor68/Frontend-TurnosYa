import React from 'react';
import {
  GoogleMap as GoogleMapComponent,
  Marker,
} from '@react-google-maps/api';

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  markers?: Array<{
    position: {
      lat: number;
      lng: number;
    };
    title?: string;
  }>;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center,
  zoom,
  markers = [],
}) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <GoogleMapComponent
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={options}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} title={marker.title} />
        ))}
      </GoogleMapComponent>
    </div>
  );
};

export default GoogleMap;

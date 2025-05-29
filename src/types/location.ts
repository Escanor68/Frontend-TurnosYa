// Tipos relacionados con ubicaciones

export interface Location {
  name: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface GeocodingResult {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Coordinates {
  lat: number;
  lng: number;
}

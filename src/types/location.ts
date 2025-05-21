// Tipos relacionados con ubicaciones

export interface Location {
  address: string
  city: string
  province: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface GeocodingResult {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
}

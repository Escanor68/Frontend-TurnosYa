export interface Field {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerHour: number;
  description: string;
  imageUrl: string;
  surface: string;
  hasLighting: boolean;
  isIndoor: boolean;
  businessHours: BusinessHour[];
}

export interface BusinessHour {
  day: number; // 0-6 (domingo a sábado)
  openTime: string; // "HH:mm"
  closeTime: string; // "HH:mm"
}

export interface FieldAvailability {
  startTime: string;
  endTime: string;
}

export interface FieldFilters {
  minPrice?: number;
  maxPrice?: number;
  surface?: string;
  hasLighting?: boolean;
  isIndoor?: boolean;
  availableDate?: string;
  availableTime?: string;
} 
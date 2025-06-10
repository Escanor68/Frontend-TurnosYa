import type { AdditionalService } from './index';

export type SurfaceType = 'GRASS' | 'ARTIFICIAL_GRASS' | 'CONCRETE' | 'SAND';
export type FieldSize = '5' | '7' | '11';

export interface Field {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  pricePerHour: number;
  currency: string;
  surfaceType: SurfaceType;
  size: FieldSize;
  hasLighting: boolean;
  hasParking: boolean;
  hasShowers: boolean;
  hasChangingRooms: boolean;
  hasEquipment: boolean;
  hasAdditionalServices: boolean;
  additionalServices?: AdditionalService[];
  images: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FieldAvailability {
  id: string;
  fieldId: string;
  dayOfWeek: number; // 0-6 (Domingo-Sábado)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isAvailable: boolean;
  price?: number;
}

export interface SpecialHours {
  id: string;
  fieldId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isAvailable: boolean;
  price?: number;
  reason?: string;
}

export interface FieldReview {
  id: string;
  fieldId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface FieldStatistics {
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  mostPopularTime: string;
  mostPopularDay: string;
}

export interface FieldSearchParams {
  city?: string;
  state?: string;
  country?: string;
  surfaceType?: SurfaceType;
  size?: FieldSize;
  hasLighting?: boolean;
  hasParking?: boolean;
  hasShowers?: boolean;
  hasChangingRooms?: boolean;
  hasEquipment?: boolean;
  minPrice?: number;
  maxPrice?: number;
  date?: string;
  startTime?: string;
  endTime?: string;
}

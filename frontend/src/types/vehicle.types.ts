export interface VehicleLocation {
  lat: number | null;
  lng: number | null;
  at: string | null; // ISO timestamp
}

export type FuelType = "petrol" | "diesel" | "electric" | "cng" | "hybrid";
export type TransmissionType = "manual" | "automatic";
export type VehicleCategory = "hatchback" | "sedan" | "suv" | "luxury" | "van" | "truck";

export interface Vehicle {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  fuelType: FuelType;
  transmission: TransmissionType;
  seats: number;
  pricePerDay: number;
  isAvailable: boolean;
  images: string[];
  features: string[];
  deviceId: string | null;
  liveLocation: VehicleLocation;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleListFilters {
  category?: VehicleCategory;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  page?: number;
  limit?: number;
}

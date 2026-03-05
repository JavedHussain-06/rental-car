export type CarStatus = "available" | "maintenance" | "inactive";
export type Transmission = "manual" | "automatic";
export type FuelType = "petrol" | "diesel" | "electric" | "cng";

export interface Car {
    _id: string;
    name: string;
    brand: string;
    slug: string;
    description?: string;
    images: string[];
    pricePerDay: number;
    transmission: Transmission;
    fuelType: FuelType;
    seats: number;
    locationId: string | { _id: string; name: string; city: string }; // Populated
    status: CarStatus;
    createdAt: string;
    updatedAt: string;
}

export interface AdminCarFilters {
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    status?: string;
    locationId?: string;
    transmission?: string;
    fuelType?: string;
    search?: string;
}

export interface CreateCarPayload {
    name: string;
    brand: string;
    description?: string;
    images?: string[];
    pricePerDay: number;
    transmission: Transmission;
    fuelType: FuelType;
    seats: number;
    locationId: string;
    status?: CarStatus;
}

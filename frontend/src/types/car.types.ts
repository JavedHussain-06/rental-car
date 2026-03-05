export type CarStatus = "available" | "maintenance" | "inactive";
export type Transmission = "manual" | "automatic";
export type FuelType = "petrol" | "diesel" | "electric" | "cng";

export interface ICarLocation {
    lat: number | null;
    lng: number | null;
    updatedAt: string | null;
}

export interface ILocation {
    _id: string;
    city: string;
    name: string;
}

export interface ICar {
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
    locationId: ILocation | string;
    status: CarStatus;
    liveLocation?: ICarLocation;
    createdAt: string;
    updatedAt: string;
}

export interface CarFilters {
    search: string;
    transmission: Transmission | "";
    fuelType: FuelType | "";
    minPrice: number;
    maxPrice: number;
    seats: number | "";
    locationId: string;
    isAvailable: boolean;
}

export interface GetCarsParams {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
    transmission?: string;
    fuelType?: string;
    minPrice?: number;
    maxPrice?: number;
    seats?: number;
    locationId?: string;
    status?: string;
}

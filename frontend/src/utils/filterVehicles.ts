import { IVehicle } from "@/mocks/vehicles.mock";
import { VehicleFilters, SortOption } from "@/store/vehicle.store";

export const filterVehicles = (
    vehicles: IVehicle[],
    filters: VehicleFilters,
    sort: SortOption
): IVehicle[] => {
    let result = [...vehicles];

    // 1. Search filter
    if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(
            (v) =>
                v.name.toLowerCase().includes(query) ||
                v.brand.toLowerCase().includes(query)
        );
    }

    // 2. Exact match filters
    if (filters.transmission) {
        result = result.filter((v) => v.transmission === filters.transmission);
    }

    if (filters.fuelType) {
        result = result.filter((v) => v.fuelType === filters.fuelType);
    }

    if (filters.seats) {
        result = result.filter((v) => v.seats === filters.seats);
    }

    if (filters.location) {
        result = result.filter((v) => v.location === filters.location);
    }

    // 3. Price Range
    if (filters.maxPrice) {
        result = result.filter((v) => v.pricePerDay <= filters.maxPrice);
    }

    if (filters.minPrice) {
        result = result.filter((v) => v.pricePerDay >= filters.minPrice);
    }

    // 4. Sorting
    result.sort((a, b) => {
        switch (sort) {
            case "price_asc":
                return a.pricePerDay - b.pricePerDay;
            case "price_desc":
                return b.pricePerDay - a.pricePerDay;
            case "rating_desc":
                return b.rating - a.rating;
            case "newest":
            default:
                // Use ID as proxy for newest in mock data if no date exists
                return b.id.localeCompare(a.id);
        }
    });

    return result;
};

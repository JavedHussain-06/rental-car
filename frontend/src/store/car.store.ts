import { create } from "zustand";
import { CarFilters } from "@/types/car.types";

export const defaultFilters: CarFilters = {
    search: "",
    transmission: "",
    fuelType: "",
    minPrice: 0,
    maxPrice: 20000,
    seats: "",
    locationId: "",
    isAvailable: false,
};

interface CarStore {
    // Filter State
    filters: CarFilters;
    setFilter: <K extends keyof CarFilters>(key: K, value: CarFilters[K]) => void;
    setFilters: (filters: Partial<CarFilters>) => void;
    resetFilters: () => void;

    // Pagination & Sorting State
    page: number;
    setPage: (page: number) => void;
    sort: string; // e.g., "pricePerDay", "-pricePerDay", "-createdAt"
    setSort: (sort: string) => void;
}

export const useCarStore = create<CarStore>((set) => ({
    filters: defaultFilters,

    setFilter: (key, value) =>
        set((state) => ({
            filters: { ...state.filters, [key]: value },
            page: 1, // Reset to first page when filter changes
        })),

    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
            page: 1,
        })),

    resetFilters: () => set({ filters: defaultFilters, page: 1 }),

    page: 1,
    setPage: (page) => set({ page }),

    sort: "-createdAt", // Default newest first
    setSort: (sort) => set({ sort, page: 1 }),
}));

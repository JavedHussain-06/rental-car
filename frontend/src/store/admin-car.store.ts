import { create } from "zustand";
import { Car, AdminCarFilters } from "@/types/admin.types";

interface AdminCarState {
    cars: Car[];
    total: number;
    isLoading: boolean;
    filters: AdminCarFilters;
    setCars: (cars: Car[], total: number) => void;
    setLoading: (loading: boolean) => void;
    setFilters: (filters: Partial<AdminCarFilters>) => void;
}

export const useAdminCarStore = create<AdminCarState>((set) => ({
    cars: [],
    total: 0,
    isLoading: false,
    filters: { page: 1, limit: 10 },
    setCars: (cars, total) => set({ cars, total }),
    setLoading: (isLoading) => set({ isLoading }),
    setFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters, page: newFilters.page ?? 1 } })),
}));

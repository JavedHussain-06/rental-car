import { create } from "zustand";

export interface VehicleFilters {
  search: string;
  transmission: string;
  fuelType: string;
  seats: number | "";
  minPrice: number;
  maxPrice: number;
  location: string;
}

export type SortOption = "price_asc" | "price_desc" | "rating_desc" | "newest";

interface VehicleState {
  filters: VehicleFilters;
  sort: SortOption;
  page: number;

  setFilter: (key: keyof VehicleFilters, value: unknown) => void;
  setSort: (sort: SortOption) => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
}

const defaultFilters: VehicleFilters = {
  search: "",
  transmission: "",
  fuelType: "",
  seats: "",
  minPrice: 0,
  maxPrice: 10000,
  location: "",
};

export const useVehicleStore = create<VehicleState>((set) => ({
  filters: defaultFilters,
  sort: "newest",
  page: 1,

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      page: 1 // Reset pagination natively on any filter interaction
    })),

  setSort: (sort) =>
    set(() => ({
      sort,
      page: 1 // Reset pagination defensively on sort logic changes
    })),

  setPage: (page) =>
    set(() => ({ page })),

  clearFilters: () =>
    set(() => ({
      filters: defaultFilters,
      sort: "newest",
      page: 1
    })),
}));

import { api } from "@/lib/axios";
import { ApiResponse, PaginatedResponse } from "@/types/api.types";
import { Vehicle, VehicleListFilters } from "@/types/vehicle.types";

export const vehiclesService = {
  list: (filters?: VehicleListFilters) =>
    api.get<PaginatedResponse<Vehicle>>("/vehicles", { params: filters }),

  getById: (id: string) => api.get<ApiResponse<Vehicle>>(`/vehicles/${id}`),
};

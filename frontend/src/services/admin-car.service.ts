import { api } from "@/lib/axios";
import { ApiResponse, PaginatedResponse } from "@/types/api.types";
import { Car, AdminCarFilters, CreateCarPayload } from "@/types/admin.types";

export const adminCarService = {
    list: (filters?: AdminCarFilters) =>
        api.get<PaginatedResponse<Car>>("/cars", { params: filters }),

    getById: (id: string) => api.get<ApiResponse<Car>>(`/cars/${id}`),

    create: (payload: CreateCarPayload) =>
        api.post<ApiResponse<Car>>("/cars", payload),

    update: (id: string, payload: Partial<CreateCarPayload>) =>
        api.patch<ApiResponse<Car>>(`/cars/${id}`, payload),

    delete: (id: string) => api.delete<ApiResponse<null>>(`/cars/${id}`),

    updateStatus: (id: string, status: Car["status"]) =>
        api.patch<ApiResponse<Car>>(`/cars/${id}/status`, { status }),
};

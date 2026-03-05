import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import {
  AvailabilityResult,
  CreateBookingPayload,
  Booking,
} from "@/types/booking.types";

export const bookingService = {
  checkAvailability: (carId: string, startDate: string, endDate: string) =>
    api.post<ApiResponse<AvailabilityResult>>("/bookings/check-availability", { carId, startDate, endDate }),

  create: (payload: CreateBookingPayload) =>
    api.post<ApiResponse<Booking>>("/bookings", payload),

  getById: (id: string) =>
    api.get<ApiResponse<Booking>>(`/bookings/${id}`),

  cancel: (id: string) =>
    api.delete<ApiResponse<Booking>>(`/bookings/${id}`),
};

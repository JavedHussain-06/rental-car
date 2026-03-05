import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAdminBooking, ADMIN_MOCK_BOOKINGS } from "@/mocks/adminBookings.mock";

interface AdminBookingsState {
    bookings: IAdminBooking[];
    updateBookingStatus: (id: string, status: IAdminBooking["status"]) => void;
    deleteBooking: (id: string) => void;
}

export const useAdminBookingsStore = create<AdminBookingsState>()(
    persist(
        (set) => ({
            bookings: ADMIN_MOCK_BOOKINGS,

            updateBookingStatus: (id, status) =>
                set((state) => ({
                    bookings: state.bookings.map((booking) =>
                        booking.id === id ? { ...booking, status } : booking
                    ),
                })),

            deleteBooking: (id) =>
                set((state) => ({
                    bookings: state.bookings.filter((booking) => booking.id !== id),
                })),
        }),
        {
            name: "admin-bookings-storage",
        }
    )
);

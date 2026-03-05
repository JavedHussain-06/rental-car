import { create } from "zustand";
import { Booking } from "@/types/booking.types";

interface BookingState {
  bookings: Booking[];
  activeBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
  setBookings: (bookings: Booking[]) => void;
  setActiveBooking: (booking: Booking | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  activeBooking: null,
  isLoading: false,
  error: null,
  setBookings: (bookings) => set({ bookings }),
  setActiveBooking: (activeBooking) => set({ activeBooking }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

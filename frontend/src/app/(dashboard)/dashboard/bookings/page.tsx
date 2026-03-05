"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Car, Loader2 } from "lucide-react";
import { Booking } from "@/types/booking.types";
// Import bookingService when user-specific booking fetch API is ready
// import { bookingService } from "@/services/booking.service";

export default function MyBookingsPage() {
  useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const bookings: Booking[] = []; // Explicitly defined until API hook is implemented

  useEffect(() => {
    // Scaffold for actual API fetch when ready. Admin listing exists, user listing needs specific query.
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">My Bookings</h1>
      <p className="mb-8 text-sm text-slate-500">Manage your past and upcoming reservations.</p>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <Car className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="mb-1 text-sm font-semibold text-slate-900">No bookings found</h3>
          <p className="text-sm text-slate-500">You haven&apos;t booked a vehicle yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Loop through bookings here */}
        </div>
      )}
    </div>
  );
}

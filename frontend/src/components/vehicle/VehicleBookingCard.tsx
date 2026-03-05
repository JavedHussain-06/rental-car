"use client";

import { useState } from "react";
import { formatCurrency } from "@/utils/format";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { AvailabilityCheck } from "@/components/booking/AvailabilityCheck";
import type { NormalizedVehicle } from "@/app/(public)/vehicles/[slug]/page";

export function VehicleBookingCard({ vehicle }: { vehicle: NormalizedVehicle }) {
  const [pickupDate, setPickupDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");

  const getDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate).getTime();
    const end = new Date(returnDate).getTime();
    const diff = end - start;
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const days = getDays();
  const subtotal = days * vehicle.pricePerDay;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const hasValidDates = Boolean(pickupDate && returnDate && days > 0);

  return (
    <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50">
      <div className="mb-6 flex items-baseline gap-2 border-b border-slate-100 pb-6">
        <span className="text-3xl font-bold tracking-tight text-slate-900">{formatCurrency(vehicle.pricePerDay)}</span>
        <span className="font-medium text-slate-500">/ day</span>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-slate-200 p-1">
          <div className="flex border-b border-slate-200">
            <div className="flex-1 border-r border-slate-200 p-3 sm:p-4">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Pickup</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full bg-transparent text-sm font-semibold outline-none text-slate-900 cursor-pointer"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div className="flex-1 p-3 sm:p-4">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Return</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full bg-transparent text-sm font-semibold outline-none text-slate-900 cursor-pointer"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={pickupDate || new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>
        </div>

        <BookingSummary
          days={days}
          pricePerDay={vehicle.pricePerDay}
          subtotal={subtotal}
          tax={tax}
          total={total}
        />

        <AvailabilityCheck
          vehicle={vehicle}
          pickupDate={pickupDate}
          returnDate={returnDate}
          hasValidDates={hasValidDates}
        />
      </div>
    </div>
  );
}

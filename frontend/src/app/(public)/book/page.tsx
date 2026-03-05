"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, IndianRupee, Clock, CheckCircle, XCircle, Loader2, Car } from "lucide-react";
import { bookingService } from "@/services/booking.service";
import { AvailabilityResult } from "@/types/booking.types";
import { formatCurrency } from "@/utils/format";

function BookCarContent() {
  const searchParams = useSearchParams();
  const preselectedCarId = searchParams.get("carId") ?? "";

  const [carId, setCarId] = useState(preselectedCarId);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ─── Step 1: Check Availability ──────────────
  const handleCheckAvailability = async () => {
    if (!carId || !startDate || !endDate) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setAvailability(null);
    setIsChecking(true);

    try {
      const res = await bookingService.checkAvailability(carId, startDate, endDate);
      setAvailability(res.data.data);
    } catch (err) {
      const apiError = err as { response?: { data?: { message?: string } } };
      setError(apiError.response?.data?.message || "Failed to check availability");
    } finally {
      setIsChecking(false);
    }
  };

  // ─── Step 2: Create Booking ──────────────────
  const handleCreateBooking = async () => {
    if (!availability?.available) return;
    setIsBooking(true);
    setError("");

    try {
      const res = await bookingService.create({ carId, startDate, endDate });
      const booking = res.data.data;
      setSuccess(`Booking created! ID: ${booking._id}`);

      // If Razorpay order existed dynamically it would be handled here
      if (booking.razorpayOrderId) {
        console.log("Razorpay Order ready:", booking.razorpayOrderId);
        // In Phase 4: open Razorpay checkout modal here
      }
    } catch (err) {
      const apiError = err as { response?: { data?: { message?: string } } };
      setError(apiError.response?.data?.message || "Failed to create booking");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Book a Vehicle</h1>
      <p className="mb-8 text-slate-500">Select dates and check availability to proceed.</p>

      {/* ─── Form Card ───────────────────────── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-5">
          {/* Car ID */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Car className="h-4 w-4" /> Car ID
            </label>
            <input
              type="text"
              value={carId}
              onChange={(e) => { setCarId(e.target.value); setAvailability(null); }}
              placeholder="Paste Car ObjectId here"
              className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Date pickers */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Calendar className="h-4 w-4" /> Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setAvailability(null); }}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Calendar className="h-4 w-4" /> End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setAvailability(null); }}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Check Availability Button */}
          <button
            onClick={handleCheckAvailability}
            disabled={isChecking}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
          >
            {isChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Clock className="h-4 w-4" />}
            {isChecking ? "Checking..." : "Check Availability"}
          </button>
        </div>

        {/* ─── Error ──────────────────────────── */}
        {error && (
          <div className="mt-5 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <XCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {/* ─── Success ────────────────────────── */}
        {success && (
          <div className="mt-5 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle className="h-4 w-4 shrink-0" /> {success}
          </div>
        )}

        {/* ─── Availability Result ────────────── */}
        {availability && (
          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-3">
              {availability.available ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Car is Available</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  <span className="font-semibold">Car is Not Available</span>
                </div>
              )}
            </div>

            {availability.available && (
              <>
                {/* Price Breakdown */}
                <div className="rounded-xl bg-slate-50 p-5">
                  <h3 className="mb-3 text-sm font-semibold text-slate-900">Price Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Vehicle</span>
                      <span className="font-medium text-slate-900">{availability.car.brand} {availability.car.name}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Rate</span>
                      <span>{formatCurrency(availability.pricePerDay)} / day</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Duration</span>
                      <span>{availability.totalDays} day{availability.totalDays > 1 ? "s" : ""}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                      <span>Total</span>
                      <span className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4" />
                        {formatCurrency(availability.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={handleCreateBooking}
                  disabled={isBooking}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
                >
                  {isBooking ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                  {isBooking ? "Creating Booking..." : "Book Now – Pay Later"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookCarPage() {
  return (
    <Suspense fallback={<div className="flex w-full items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <BookCarContent />
    </Suspense>
  );
}

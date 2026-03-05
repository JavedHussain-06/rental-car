"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { bookingService } from "@/services/booking.service";
import { paymentService } from "@/services/payment.service";
import { useRouter } from "next/navigation";
import { initializeRazorpayCheckout } from "./RazorpayCheckout";
import type { NormalizedVehicle } from "@/app/(public)/vehicles/[slug]/page";

interface AvailabilityCheckProps {
  vehicle: NormalizedVehicle;
  pickupDate: string;
  returnDate: string;
  hasValidDates: boolean;
}

export function AvailabilityCheck({ vehicle, pickupDate, returnDate, hasValidDates }: AvailabilityCheckProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleAvailability = async () => {
    console.log("Check availability clicked");
    if (!hasValidDates) {
      toast({ title: "Dates Required", description: "Please select pickup and return dates.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    try {
      const startISO = new Date(pickupDate).toISOString();
      const endISO = new Date(returnDate).toISOString();
      console.log("Availability payload:", { carId: vehicle._id, startDate: startISO, endDate: endISO });
      const res = await bookingService.checkAvailability(vehicle._id, startISO, endISO);
      if (res.data.data.available) {
        toast({ title: "Vehicle is Available", description: `You can securely book the ${vehicle.name} now.` });
      } else {
        toast({ title: "Not Available", description: "Vehicle already booked for these dates.", variant: "destructive" });
      }
    } catch (err: unknown) {
      console.error("Availability check error:", err);
      const error = err as { response?: { data?: { message?: string; errors?: Array<{ msg: string }> } } };
      const msg = error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || "Failed to check availability.";
      toast({ title: "Availability Error", description: msg, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBook = async () => {
    console.log("Book now clicked");
    if (!hasValidDates) {
      toast({ title: "Dates Required", description: "Please select pickup and return dates before booking.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    try {
      const startISO = new Date(pickupDate).toISOString();
      const endISO = new Date(returnDate).toISOString();
      console.log("Booking payload:", { carId: vehicle._id, startDate: startISO, endDate: endISO });

      // 1. Create DB booking
      const bookingRes = await bookingService.create({
        carId: vehicle._id,
        startDate: startISO,
        endDate: endISO,
      });

      const newBookingId = bookingRes.data.data._id;

      // 2. Fetch Razorpay Order Signature
      const orderRes = await paymentService.createOrder(newBookingId);
      const orderData = orderRes.data.data;

      // 3. Mount Razorpay SDK securely
      const rzp = await initializeRazorpayCheckout({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "One Way Drive",
        description: `Booking for ${vehicle.brand} ${vehicle.name}`,
        order_id: orderData.orderId,
        handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; }) {
          try {
            // 4. Verify Cryptographic Integrity
            await paymentService.verifySignature({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            toast({ title: "Booking confirmed successfully.", description: "Your transaction was securely verified." });
            router.push("/dashboard/bookings");
          } catch {
            toast({ title: "Verification Failed", description: "Payment signature mismatch.", variant: "destructive" });
          }
        },
        theme: { color: "#2563EB" },
      });

      rzp.on("payment.failed", function () {
        toast({ title: "Payment Failed", description: "Your transaction was declined.", variant: "destructive" });
      });
      rzp.open();

    } catch (err: unknown) {
      console.error("Booking error:", err);
      const error = err as { response?: { data?: { message?: string; errors?: Array<{ msg: string }> } } };
      const message = error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || "Failed to initiate booking flow.";
      toast({ title: "Booking Error", description: message, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-4 space-y-3">
      <button
        onClick={handleAvailability}
        disabled={isProcessing}
        className="w-full rounded-xl bg-slate-100 px-4 py-3.5 text-sm font-bold tracking-tight text-slate-900 transition-colors hover:bg-slate-200 disabled:opacity-50"
      >
        {isProcessing ? "Working..." : "Check Availability"}
      </button>
      <button
        onClick={handleBook}
        disabled={isProcessing}
        className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold tracking-tight text-white shadow-sm transition-colors hover:bg-blue-700 hover:shadow-md disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Book Now & Pay"}
      </button>
    </div>
  );
}

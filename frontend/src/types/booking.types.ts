export type BookingStatus = "reserved" | "confirmed" | "active" | "completed" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface Booking {
  _id: string;
  carId: string | {
    _id: string;
    name: string;
    brand: string;
    images: string[];
    pricePerDay: number;
  };
  userId: string | null;
  startDate: string;
  endDate: string;
  totalDays: number;
  pricePerDay: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilityResult {
  available: boolean;
  car: { _id: string; name: string; brand: string; pricePerDay: number };
  totalDays: number;
  totalAmount: number;
  pricePerDay: number;
}

export interface CreateBookingPayload {
  carId: string;
  startDate: string;
  endDate: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  notes?: string;
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
}



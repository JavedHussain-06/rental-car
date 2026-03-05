import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
}

interface VerifyPaymentPayload {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export const paymentService = {
  createOrder: (bookingId: string) =>
    api.post<ApiResponse<CreateOrderResponse>>("/payments/create-order", { bookingId }),

  verifySignature: (payload: VerifyPaymentPayload) =>
    api.post<ApiResponse<{ verified: boolean }>>("/payments/verify", payload),
};

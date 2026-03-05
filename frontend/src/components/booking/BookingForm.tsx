"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bookingService } from "@/services/booking.service";

const bookingSchema = z.object({
  vehicleId: z.string().min(1, "Vehicle is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({ resolver: zodResolver(bookingSchema) });

  const onSubmit = async (values: BookingFormValues) => {
    await bookingService.create({
      carId: values.vehicleId,
      startDate: values.startDate,
      endDate: values.endDate,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input placeholder="Vehicle ID" {...register("vehicleId")} />
        {errors.vehicleId && <p className="mt-1 text-xs text-red-600">{errors.vehicleId.message}</p>}
      </div>
      <div>
        <Input type="date" {...register("startDate")} />
        {errors.startDate && <p className="mt-1 text-xs text-red-600">{errors.startDate.message}</p>}
      </div>
      <div>
        <Input type="date" {...register("endDate")} />
        {errors.endDate && <p className="mt-1 text-xs text-red-600">{errors.endDate.message}</p>}
      </div>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Creating..." : "Create Booking"}
      </Button>
    </form>
  );
}

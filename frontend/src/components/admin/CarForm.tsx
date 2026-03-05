"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { IAdminCar } from "@/mocks/adminCars.mock";
import { useAdminCarsStore } from "@/store/adminCars.store";
import { useToast } from "@/hooks/use-toast";

// Strict Front-End Entity Validation
const carFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  image: z.string().url("Must be a valid URL"),
  pricePerDay: z.number().min(500, "Minimum price is ₹500").max(50000, "Maximum price is ₹50000"),
  transmission: z.enum(["manual", "automatic"]),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid"]),
  seats: z.number().min(2, "Minimum 2 seats").max(10, "Maximum 10 seats"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  status: z.enum(["available", "maintenance", "inactive"]),
});

type CarFormValues = z.infer<typeof carFormSchema>;

interface Props {
  initialData?: IAdminCar;
  isEditing?: boolean;
}

export function CarForm({ initialData, isEditing = false }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { addCar, updateCar } = useAdminCarsStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: initialData || {
      name: "",
      brand: "",
      image: "https://images.unsplash.com/photo-1550462000-8bfafe7d6438?auto=format&fit=crop&q=80", 
      pricePerDay: 1500,
      transmission: "automatic",
      fuelType: "petrol",
      seats: 5,
      location: "Mumbai",
      status: "available",
    },
  });

  const onSubmit = async (data: CarFormValues) => {
    try {
      // Fake network latency feeling
      await new Promise(resolve => setTimeout(resolve, 600));

      if (isEditing && initialData) {
        updateCar(initialData.id, data);
        toast({
          title: "Vehicle Updated",
          description: `${data.brand} ${data.name} was updated successfully.`,
        });
      } else {
        addCar({ ...data, rating: 4.5 }); // Default static rating since it's mock
        toast({
          title: "Vehicle Published",
          description: `${data.brand} ${data.name} was added to the fleet.`,
        });
      }
      
      router.push("/admin/cars");
      router.refresh();
    } catch {
       toast({
         variant: "destructive",
         title: "Sync Error",
         description: "Failed to persist data state. Let the engineering team know.",
       });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Basic Information</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Brand Name</label>
              <input
                {...register("brand")}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                placeholder="e.g. Toyota"
              />
              {errors.brand && <p className="text-xs font-medium text-red-500">{errors.brand.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Model Name</label>
              <input
                {...register("name")}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                placeholder="e.g. Innova Crysta"
              />
              {errors.name && <p className="text-xs font-medium text-red-500">{errors.name.message}</p>}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Technical Specifications</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Transmission</label>
              <select
                {...register("transmission")}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm capitalize focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Fuel Engine</label>
              <select
                {...register("fuelType")}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm capitalize focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Seating Capacity</label>
              <input
                {...register("seats", { valueAsNumber: true })}
                type="number"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                min={2}
                max={20}
              />
              {errors.seats && <p className="text-xs font-medium text-red-500">{errors.seats.message}</p>}
            </div>
          </div>
        </div>

        {/* Commercial Logic */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Commercial Setup</h2>
          <div className="grid gap-6 sm:grid-cols-3">
             <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Price Per Day (₹)</label>
              <input
                {...register("pricePerDay", { valueAsNumber: true })}
                type="number"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
              {errors.pricePerDay && <p className="text-xs font-medium text-red-500">{errors.pricePerDay.message}</p>}
            </div>

             <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Fleet Location</label>
              <input
                {...register("location")}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                placeholder="City Name"
              />
              {errors.location && <p className="text-xs font-medium text-red-500">{errors.location.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Visibility Status</label>
              <select
                {...register("status")}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm capitalize focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="available">Available (Live)</option>
                <option value="maintenance">In Maintenance</option>
                <option value="inactive">Inactive (Hidden)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Media Presentation</h2>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Display Image URL</label>
            <input
              {...register("image")}
              type="url"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-blue-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              placeholder="https://images.unsplash.com/..."
            />
             {errors.image && <p className="text-xs font-medium text-red-500">{errors.image.message}</p>}
            <p className="text-xs font-medium text-slate-400 mt-1">Provide a high quality unspash resolution link for best conversion metrics.</p>
          </div>
        </div>


        <div className="flex gap-4 pt-4 border-t border-slate-100 mt-8">
          <Link
            href="/admin/cars"
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex min-w-[140px] items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : isEditing ? "Save Changes" : "Publish Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
}

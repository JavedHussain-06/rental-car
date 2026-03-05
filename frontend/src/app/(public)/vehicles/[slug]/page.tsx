"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, ChevronRight, Home } from "lucide-react";
import { MOCK_VEHICLES, IVehicle } from "@/mocks/vehicles.mock";
import { carService } from "@/services/car.service";
import { ICar } from "@/types/car.types";

import { VehicleGallery } from "@/components/vehicle/VehicleGallery";
import { VehicleSpecs } from "@/components/vehicle/VehicleSpecs";
import { VehicleFeatures } from "@/components/vehicle/VehicleFeatures";
import { VehicleBookingCard } from "@/components/vehicle/VehicleBookingCard";
import { VehicleRating } from "@/components/vehicle/VehicleRating";
import { VehicleNotFound } from "@/components/vehicle/VehicleNotFound";
import { RelatedVehicles } from "@/components/vehicle/RelatedVehicles";
import { VehicleDetailSkeleton } from "@/components/vehicle/VehicleDetailSkeleton";
import { AvailabilityBadge } from "@/components/vehicles/AvailabilityBadge";

/**
 * Normalized shape used by all child components on this page.
 * Allows both real backend cars (ICar) and mock vehicles (IVehicle).
 */
export interface NormalizedVehicle {
  _id: string;        // MongoDB ObjectId (real) or mock id
  name: string;
  brand: string;
  slug: string;
  image: string;       // Single display image
  pricePerDay: number;
  transmission: string;
  fuelType: string;
  seats: number;
  location: string;
  rating: number;
  status: string;
}

/** Convert backend ICar to the normalized display shape */
function fromCar(car: ICar): NormalizedVehicle {
  const loc = typeof car.locationId === "object" ? car.locationId : null;
  return {
    _id: car._id,
    name: car.name,
    brand: car.brand,
    slug: car.slug,
    image: car.images?.[0] || "https://images.unsplash.com/photo-1549317661-bd32c0e5a809?auto=format&fit=crop&q=80",
    pricePerDay: car.pricePerDay,
    transmission: car.transmission,
    fuelType: car.fuelType,
    seats: car.seats,
    location: loc ? `${loc.name}, ${loc.city}` : "India",
    rating: 4.5,
    status: car.status,
  };
}

/** Convert mock IVehicle to the normalized display shape */
function fromMock(v: IVehicle): NormalizedVehicle {
  return {
    _id: v.id,
    name: v.name,
    brand: v.brand,
    slug: v.slug,
    image: v.image,
    pricePerDay: v.pricePerDay,
    transmission: v.transmission,
    fuelType: v.fuelType,
    seats: v.seats,
    location: v.location,
    rating: v.rating,
    status: v.status,
  };
}

export default function VehicleDetailsPage() {
  const params = useParams();

  const [vehicle, setVehicle] = useState<NormalizedVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params.slug) return;
    const slug = String(params.slug);

    const load = async () => {
      setIsLoading(true);
      try {
        // 1. Try real backend API
        const res = await carService.getCarBySlug(slug);
        const car = res.data.data;
        setVehicle(fromCar(car));
      } catch {
        // 2. Fallback to mock data
        const found = MOCK_VEHICLES.find((v) => v.slug === slug);
        setVehicle(found ? fromMock(found) : null);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [params.slug]);

  if (isLoading) return <VehicleDetailSkeleton />;
  if (!vehicle) return <VehicleNotFound />;

  return (
    <div className="bg-white pb-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation */}
        <nav className="mb-8 flex items-center flex-wrap gap-2 text-sm font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors"><Home className="h-4 w-4" /></Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <Link href="/vehicles" className="hover:text-blue-600 transition-colors">Fleet Directory</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-slate-900 font-semibold">{vehicle.brand} {vehicle.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
          {/* Left Column: Details */}
          <div className="space-y-10">
            {/* Header Section */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <AvailabilityBadge status={vehicle.status as "available" | "maintenance"} />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                {vehicle.brand} {vehicle.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-6">
                <span className="flex items-center gap-1.5 font-semibold text-slate-600">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  {vehicle.location}
                </span>
                <VehicleRating rating={vehicle.rating} />
              </div>
            </div>

            <VehicleGallery mainImage={vehicle.image} altText={`${vehicle.brand} ${vehicle.name}`} />

            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Vehicle Specifications</h2>
              <VehicleSpecs vehicle={vehicle} />
            </div>

            <VehicleFeatures />
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="relative">
            <VehicleBookingCard vehicle={vehicle} />
          </div>
        </div>

        <RelatedVehicles currentSlug={vehicle.slug} />
      </div>
    </div>
  );
}

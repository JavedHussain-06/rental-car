import Link from "next/link";
import { Users, Fuel, Settings2, MapPin } from "lucide-react";
import { ICar } from "@/types/car.types";

export function CarCard({ car }: { car: ICar }) {
  // Placeholder logic for location name if it's an expanded object vs string ID
  const locationName = typeof car.locationId === "object" ? car.locationId.name || car.locationId.city : "Location";

  const isAvailable = car.status === "available";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-slate-300">
      {/* Image Area */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <div className="absolute left-3 top-3 z-10">
          <span 
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-md
              ${isAvailable 
                ? 'bg-emerald-500/90 text-white' 
                : 'bg-amber-500/90 text-white'}`}
          >
            {isAvailable ? "Available" : "Maintenance"}
          </span>
        </div>
        
        {/* We use an img tag instead of next/image for external URLs assuming they come from an S3 bucket or similar and aren't heavily optimized, but in a real app would configure next/image domains */}
        <img
          src={car.images[0] || "https://images.unsplash.com/photo-1549317661-bd32c0e5a809?auto=format&fit=crop&q=80"}
          alt={`${car.brand} ${car.name}`}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-start justify-between">
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {car.brand} {car.name}
            </h3>
            <p className="flex items-center text-sm text-slate-500 mt-1">
              <MapPin className="mr-1 h-3.5 w-3.5 shrink-0" />
              {locationName}
            </p>
          </div>
        </div>

        {/* Features Row */}
        <div className="my-5 grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 p-2 text-center text-xs font-medium text-slate-600">
            <Settings2 className="mb-1 h-4 w-4 text-slate-400" />
            <span className="capitalize">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 p-2 text-center text-xs font-medium text-slate-600">
            <Fuel className="mb-1 h-4 w-4 text-slate-400" />
            <span className="capitalize">{car.fuelType}</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 p-2 text-center text-xs font-medium text-slate-600">
            <Users className="mb-1 h-4 w-4 text-slate-400" />
            <span>{car.seats} Seats</span>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-5">
          <div>
            <p className="text-xs font-medium text-slate-500">Price</p>
            <p className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-slate-900 pr-1">₹{car.pricePerDay}</span>
              <span className="text-sm font-medium text-slate-500">/ day</span>
            </p>
          </div>
          <Link
            href={`/cars/${car.slug}`}
            className="flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

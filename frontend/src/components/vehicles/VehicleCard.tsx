import Image from "next/image";
import Link from "next/link";
import { User, Fuel, GripHorizontal, IndianRupee, MapPin } from "lucide-react";
import { IVehicle } from "@/mocks/vehicles.mock";
import { RatingStars } from "./RatingStars";
import { AvailabilityBadge } from "./AvailabilityBadge";

export function VehicleCard({ vehicle }: { vehicle: IVehicle }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-blue-200">
      {/* Image Container with Zoom Effect */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-4 top-4">
          <AvailabilityBadge status={vehicle.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              {vehicle.brand} {vehicle.name}
            </h3>
            <p className="flex items-center text-sm font-medium text-slate-500">
              <MapPin className="mr-1 h-3.5 w-3.5" />
              {vehicle.location}
            </p>
          </div>
          <div className="text-right">
            <span className="flex items-center text-xl font-black text-blue-600">
              <IndianRupee className="h-5 w-5" />
              {vehicle.pricePerDay}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Per Day
            </span>
          </div>
        </div>

        <div className="mb-6">
          <RatingStars rating={vehicle.rating} />
        </div>

        {/* Feature Grid */}
        <div className="mb-6 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-4">
          <div className="flex flex-col items-center justify-center gap-1.5 text-slate-600">
            <GripHorizontal className="h-5 w-5 text-slate-400" />
            <span className="text-xs font-medium capitalize">{vehicle.transmission}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5 border-x border-slate-200 text-slate-600">
            <Fuel className="h-5 w-5 text-slate-400" />
            <span className="text-xs font-medium capitalize">{vehicle.fuelType}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5 text-slate-600">
            <User className="h-5 w-5 text-slate-400" />
            <span className="text-xs font-medium">{vehicle.seats} Seats</span>
          </div>
        </div>

        {/* Call To Action */}
        <div className="mt-auto">
          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

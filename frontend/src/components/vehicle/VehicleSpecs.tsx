import { Settings, Fuel, Users, Gauge, Car as CarIcon } from "lucide-react";

interface VehicleSpecsProps {
  vehicle: { transmission: string; fuelType: string; seats: number };
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const specs = [
    { label: "Transmission", value: vehicle.transmission, icon: Settings },
    { label: "Fuel Type", value: vehicle.fuelType, icon: Fuel },
    { label: "Seats", value: `${vehicle.seats} Adults`, icon: Users },
    { label: "Mileage", value: "18 km/l", icon: Gauge }, // Mocked extra fields
    { label: "Category", value: "Premium Auto", icon: CarIcon }, 
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {specs.map((spec, i) => {
        const Icon = spec.icon;
        return (
          <div key={i} className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{spec.label}</span>
            <span className="mt-1 font-bold capitalize text-slate-900">{spec.value}</span>
          </div>
        );
      })}
    </div>
  );
}

import { CheckCircle2 } from "lucide-react";

export function VehicleFeatures() {
  const features = [
    "Automatic Climate Control",
    "Power Steering",
    "Bluetooth Audio Setup",
    "GPS Navigation Tracking",
    "Premium Sound System",
    "Leather Upholstery",
    "ABS with EBD",
    "Dual Front Airbags"
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Premium Features</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            <span className="font-semibold text-slate-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

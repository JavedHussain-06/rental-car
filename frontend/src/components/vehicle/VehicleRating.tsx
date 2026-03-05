import { Star } from "lucide-react";

export function VehicleRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      <span className="font-bold text-slate-900">{rating}</span>
      <span className="text-sm font-medium text-slate-500">(120+ Verified Reviews)</span>
    </div>
  );
}

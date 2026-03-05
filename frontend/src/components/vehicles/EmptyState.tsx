import { SearchX } from "lucide-react";
import { useVehicleStore } from "@/store/vehicle.store";

export function EmptyState() {
  const clearFilters = useVehicleStore((state) => state.clearFilters);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-4 ring-8 ring-slate-50">
        <SearchX className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-900">No vehicles found</h3>
      <p className="mb-6 max-w-sm text-sm text-slate-500">
        We couldn&apos;t find any vehicles matching your current filters. Try adjusting your search criteria using broader terms.
      </p>
      <button
        onClick={clearFilters}
        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-md"
      >
        Clear all filters
      </button>
    </div>
  );
}

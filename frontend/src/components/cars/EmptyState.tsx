import { Car } from "lucide-react";

export function EmptyState({ 
  onReset 
}: { 
  onReset: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
        <Car className="h-12 w-12 text-slate-400" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-900">No vehicles available</h3>
      <p className="mb-8 max-w-sm text-slate-500">
        We couldn&apos;t find any cars matching your current filters. Try changing your dates, location, or adjusting the filters.
      </p>
      <button
        onClick={onReset}
        className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
      >
        Clear all filters
      </button>
    </div>
  );
}

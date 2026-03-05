import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

export function VehicleNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <SearchX className="h-10 w-10 text-slate-400" />
      </div>
      <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">Vehicle Not Found</h2>
      <p className="mt-2 text-center text-slate-500 max-w-md">
        We couldn&apos;t find the vehicle you&apos;re looking for. It may have been removed or is currently unavailable in the active fleet.
      </p>
      <Link
        href="/vehicles"
        className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Fleet Directory
      </Link>
    </div>
  );
}

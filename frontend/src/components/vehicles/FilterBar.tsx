"use client";

import { useVehicleStore } from "@/store/vehicle.store";
import { Search, SlidersHorizontal, IndianRupee } from "lucide-react";

export function FilterBar() {
  const { filters, setFilter, clearFilters } = useVehicleStore();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-1 lg:h-max">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <SlidersHorizontal className="h-5 w-5" /> Filters
        </h2>
        <button
          onClick={clearFilters}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-8">
        {/* Search */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Search Vehicle</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilter("search", e.target.value)}
              className="block w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="E.g. Swift, Creta..."
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="mb-4 block text-sm font-semibold text-slate-700">Price Range (per day)</label>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IndianRupee className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="number"
                value={filters.minPrice || ""}
                onChange={(e) => setFilter("minPrice", Number(e.target.value))}
                className="block w-full rounded-xl border border-slate-300 py-2 pl-8 pr-3 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Min"
              />
            </div>
            <span className="text-slate-400">-</span>
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IndianRupee className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="number"
                value={filters.maxPrice || ""}
                onChange={(e) => setFilter("maxPrice", Number(e.target.value))}
                className="block w-full rounded-xl border border-slate-300 py-2 pl-8 pr-3 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Transmission */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">Transmission</label>
          <div className="grid grid-cols-2 gap-3">
            {["manual", "automatic"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter("transmission", filters.transmission === type ? "" : type)}
                className={`rounded-xl border py-2.5 text-sm font-semibold capitalize transition-all ${
                  filters.transmission === type
                    ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">Fuel Type</label>
          <div className="grid grid-cols-2 gap-3">
            {["petrol", "diesel", "electric", "hybrid"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter("fuelType", filters.fuelType === type ? "" : type)}
                className={`rounded-xl border py-2.5 text-sm font-semibold capitalize transition-all ${
                  filters.fuelType === type
                    ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Seats */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">Seats</label>
          <div className="flex flex-wrap gap-3">
            {[4, 5, 7, 8].map((s) => (
              <button
                key={s}
                onClick={() => setFilter("seats", filters.seats === s ? "" : s)}
                className={`flex h-10 min-w-[3rem] items-center justify-center rounded-xl border text-sm font-semibold transition-all ${
                  filters.seats === s
                    ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

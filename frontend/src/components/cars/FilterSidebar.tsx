"use client";

import { useCarStore } from "@/store/car.store";
import { Search, SlidersHorizontal } from "lucide-react";

export function FilterSidebar() {
  const { filters, setFilter, resetFilters } = useCarStore();

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:w-72 lg:shrink-0 sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <SlidersHorizontal className="h-5 w-5 text-blue-600" />
          Filters
        </h2>
        <button
          onClick={resetFilters}
          className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline focus:outline-none"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-6 divide-y divide-slate-100">
        
        {/* Search */}
        <div className="pt-4 first:pt-0">
          <label className="mb-3 block text-sm font-semibold text-slate-900">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search brand or model..."
              value={filters.search}
              onChange={(e) => setFilter("search", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Transmission */}
        <div className="pt-4">
          <label className="mb-3 block text-sm font-semibold text-slate-900">Transmission</label>
          <div className="flex flex-col gap-2.5">
            {["manual", "automatic"].map((type) => (
              <label key={type} className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="transmission"
                  value={type}
                  checked={filters.transmission === type}
                  onChange={(e) => setFilter("transmission", e.target.value as "manual" | "automatic")}
                  className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div className="pt-4">
          <label className="mb-3 block text-sm font-semibold text-slate-900">Fuel Type</label>
          <div className="flex flex-col gap-2.5">
            {["petrol", "diesel", "electric", "cng"].map((type) => (
              <label key={type} className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="fuelType"
                  value={type}
                  checked={filters.fuelType === type}
                  onChange={(e) => setFilter("fuelType", e.target.value as "petrol" | "diesel" | "electric" | "cng")}
                  className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Seats */}
        <div className="pt-4">
          <label className="mb-3 block text-sm font-semibold text-slate-900">Seats</label>
          <div className="grid grid-cols-3 gap-2">
            {[4, 5, 7].map((num) => (
              <button
                key={num}
                onClick={() => setFilter("seats", filters.seats === num ? "" : num)}
                className={`flex items-center justify-center rounded-lg border py-2 text-sm font-medium transition-colors ${
                  filters.seats === num
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="pt-4">
          <label className="mb-1 block text-sm font-semibold text-slate-900 flex justify-between">
            <span>Max Price / Day</span>
            <span className="text-blue-600 font-bold">₹{filters.maxPrice}</span>
          </label>
          <input
             type="range"
             min={1000}
             max={20000}
             step={500}
             value={filters.maxPrice}
             onChange={(e) => setFilter("maxPrice", Number(e.target.value))}
             className="w-full accent-blue-600 mt-4"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
             <span>₹1,000</span>
             <span>₹20,000+</span>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="pt-4">
           <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-semibold text-slate-900">Show Available Only</span>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden bg-slate-200">
                <input
                   type="checkbox"
                   checked={filters.isAvailable}
                   onChange={(e) => setFilter("isAvailable", e.target.checked)}
                   className="peer sr-only"
                />
                <div className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${filters.isAvailable ? 'translate-x-5 bg-blue-600' : 'translate-x-1'}`} />
                <div className={`absolute inset-0 bg-blue-600 transition-opacity duration-200 ease-in-out ${filters.isAvailable ? 'opacity-100' : 'opacity-0'}`} />
              </div>
           </label>
        </div>

      </div>
    </div>
  );
}

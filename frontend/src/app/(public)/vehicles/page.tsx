"use client";

import { useState, useEffect, useMemo } from "react";
import { FilterBar } from "@/components/vehicles/FilterBar";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { SkeletonCard } from "@/components/vehicles/SkeletonCard";
import { EmptyState } from "@/components/vehicles/EmptyState";
import { Pagination } from "@/components/vehicles/Pagination";
import { useVehicleStore } from "@/store/vehicle.store";
import { filterVehicles } from "@/utils/filterVehicles";
import { MOCK_VEHICLES } from "@/mocks/vehicles.mock";
import { SlidersHorizontal } from "lucide-react";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export default function VehiclesPage() {
  const { filters, sort, page, setSort } = useVehicleStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Simulate network delay to trigger premium Skeleton loading exactly once on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // 1. Memoized Local Filtering using the pure algorithm utility
  const filteredVehicles = useMemo(() => {
    // If backend mode active in future, we bypass local filtering
    if (!USE_MOCK && process.env.NODE_ENV !== "development") {
        // Production API bypass placeholder
        return MOCK_VEHICLES;
    }
    return filterVehicles(MOCK_VEHICLES, filters, sort);
  }, [filters, sort]);

  // 2. Pagination Slice Logic
  const ITEMS_PER_PAGE = 6;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ─── Breadcrumbs & Header ──────────────── */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Browse Vehicles
        </h1>
        <p className="mt-2 text-lg text-slate-500">
          Find the perfect ride for your next journey from our premium fleet.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* ─── Mobile Filter Toggle ────────────── */}
        <div className="lg:hidden">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* ─── Sidebar Filters ─────────────────── */}
        <div className={`w-full lg:w-80 lg:flex-shrink-0 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
          <div className="sticky top-24">
            <FilterBar />
          </div>
        </div>

        {/* ─── Main Content Area ───────────────── */}
        <div className="flex-1">
          {/* Top Bar: Results Count & Sorting */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="font-semibold text-slate-900">{filteredVehicles.length}</span> results
            </p>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-slate-600">Sort by:</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as import("@/store/vehicle.store").SortOption)}
                className="rounded-lg border-slate-300 py-1.5 pl-3 pr-8 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="newest">Recently Added</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Grid Layout */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))}
            </div>
          ) : filteredVehicles.length === 0 ? (
            <EmptyState />
          ) : (
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && filteredVehicles.length > 0 && (
             <Pagination totalItems={filteredVehicles.length} itemsPerPage={ITEMS_PER_PAGE} />
          )}
        </div>
      </div>
    </div>
  );
}

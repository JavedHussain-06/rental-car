"use client";

import { Search, Filter } from "lucide-react";
import { useAdminCarStore } from "@/store/admin-car.store";

export function FilterBar() {
  const { filters, setFilters } = useAdminCarStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <div className="relative w-full max-w-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name or brand..."
          value={filters.search ?? ""}
          onChange={handleSearch}
          className="block w-full rounded-lg border border-slate-300 bg-white p-2.5 pl-10 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Select Filters */}
      <div className="flex w-full items-center gap-3 sm:w-auto">
        <div className="relative w-full sm:w-auto">
          <select
            value={filters.status ?? ""}
            onChange={(e) => setFilters({ status: e.target.value || undefined })}
            className="block w-full appearance-none rounded-lg border border-slate-300 bg-white p-2.5 pr-8 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
          <Filter className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        <div className="relative w-full sm:w-auto">
          <select
            value={filters.fuelType ?? ""}
            onChange={(e) => setFilters({ fuelType: e.target.value || undefined })}
            className="block w-full appearance-none rounded-lg border border-slate-300 bg-white p-2.5 pr-8 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Any Fuel Type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
          <Filter className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}

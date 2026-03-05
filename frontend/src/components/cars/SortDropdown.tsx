"use client";

import { useCarStore } from "@/store/car.store";

export function SortDropdown() {
  const { sort, setSort } = useCarStore();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-500 hidden sm:inline-block">Sort by:</span>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%221.67%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.5rem_center] cursor-pointer hover:border-slate-300 transition-colors"
      >
        <option value="-createdAt">Newest Additions</option>
        <option value="pricePerDay">Price: Low to High</option>
        <option value="-pricePerDay">Price: High to Low</option>
      </select>
    </div>
  );
}

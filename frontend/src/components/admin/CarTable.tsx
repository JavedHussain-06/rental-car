"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2, Search, SlidersHorizontal, Loader2, IndianRupee } from "lucide-react";
import Image from "next/image";
import { useAdminCarsStore } from "@/store/adminCars.store";
import { StatusBadge } from "./StatusBadge";
import { AdminPageHeader } from "./AdminPageHeader";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";

export function CarTable() {
  const { cars, toggleStatus, deleteCar } = useAdminCarsStore();
  
  // Local state for hydration prevention and UI feedback
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Table state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; carId: string; carName: string }>({
    isOpen: false,
    carId: "",
    carName: "",
  });

  const ITEMS_PER_PAGE = 6;

  // Handle Hydration cleanly
  useEffect(() => {
    setMounted(true);
    // Simulate initial load for premium skeleton feeling (optional but requested)
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  // Compute Active Table Data pure-functionally
  const filteredCars = useMemo(() => {
    let result = cars.slice().reverse(); // Show newest first based on array position

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }

    return result;
  }, [cars, searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCars.length / ITEMS_PER_PAGE));
  
  // Reset pagination if filters throw us out of bounds
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const paginatedCars = filteredCars.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = () => {
    if (deleteDialog.carId) {
      deleteCar(deleteDialog.carId);
      setDeleteDialog({ isOpen: false, carId: "", carName: "" });
    }
  };

  if (!mounted) return null; // Hydration guard

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Fleet Management"
        description="Manage your inventory, update pricing, and monitor real-time availability."
        actionLabel="Add New Vehicle"
        actionHref="/admin/cars/new"
      />

      {/* ─── FILTERS ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border-slate-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border-slate-300 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:ring-blue-500 font-medium text-slate-700"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* ─── TABLE ──────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 font-semibold uppercase tracking-wider text-xs">Vehicle</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Details</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Price / Day</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 text-right font-semibold uppercase tracking-wider text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
                    <p className="mt-4 text-sm font-medium text-slate-500">Loading fleet data...</p>
                  </td>
                </tr>
              ) : paginatedCars.length === 0 ? (
                <tr>
                  <td colSpan={5} className="bg-slate-50 py-16 text-center">
                    <p className="text-sm font-medium text-slate-500">No vehicles match your search criteria.</p>
                  </td>
                </tr>
              ) : (
                paginatedCars.map((car) => (
                  <tr key={car.id} className="group transition-colors hover:bg-slate-50/70">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
                          <Image
                            src={car.image}
                            alt={car.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{car.brand}</div>
                          <div className="text-slate-500">{car.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900 capitalize">{car.transmission}</div>
                      <div className="text-xs text-slate-500 capitalize">{car.fuelType} • {car.seats} Seats</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center font-bold text-slate-900">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {car.pricePerDay}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <button 
                         onClick={() => toggleStatus(car.id)}
                         className="cursor-pointer transition-opacity hover:opacity-80 active:scale-95"
                         title="Toggle Registration Status"
                       >
                         <StatusBadge status={car.status} />
                       </button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
                        <Link
                          href={`/admin/cars/${car.id}/edit`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="Edit Vehicle"
                        >
                          <Edit className="h-4.5 w-4.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteDialog({ isOpen: true, carId: car.id, carName: `${car.brand} ${car.name}` })}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Vehicle"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ─── PAGINATION BOTTOM BAR ────────────────────────────── */}
        {!isLoading && filteredCars.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4">
            <span className="text-sm font-medium text-slate-500">
              Showing <span className="font-semibold text-slate-900">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
              <span className="font-semibold text-slate-900">{Math.min(page * ITEMS_PER_PAGE, filteredCars.length)}</span> of{" "}
              <span className="font-semibold text-slate-900">{filteredCars.length}</span> entries
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-hover hover:bg-slate-50 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-hover hover:bg-slate-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, carId: "", carName: "" })}
        onConfirm={handleDelete}
        title="Delete Vehicle"
        description={`Are you absolutely sure you want to delete the ${deleteDialog.carName}? This action cannot be undone and will permanently remove this asset from the fleet database.`}
      />
    </div>
  );
}

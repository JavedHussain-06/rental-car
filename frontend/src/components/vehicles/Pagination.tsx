"use client";

import { useVehicleStore } from "@/store/vehicle.store";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ totalItems, itemsPerPage }: { totalItems: number; itemsPerPage: number }) {
  const { page, setPage } = useVehicleStore();
  
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
      <div className="hidden sm:block">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{Math.min((page - 1) * itemsPerPage + 1, totalItems)}</span> to{" "}
          <span className="font-semibold text-slate-900">{Math.min(page * itemsPerPage, totalItems)}</span> of{" "}
          <span className="font-semibold text-slate-900">{totalItems}</span> vehicles
        </p>
      </div>

      <div className="flex flex-1 items-center justify-between sm:justify-end gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        
        {/* Simple Page Numbers for desktop */}
        <div className="hidden sm:flex items-center gap-2 px-2">
           {[...Array(totalPages)].map((_, i) => {
             const pageNum = i + 1;
             return (
               <button
                 key={pageNum}
                 onClick={() => setPage(pageNum)}
                 className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                   page === pageNum
                     ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                     : "text-slate-600 hover:bg-slate-100"
                 }`}
               >
                 {pageNum}
               </button>
             );
           })}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

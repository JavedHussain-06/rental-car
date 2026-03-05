"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Eye, XCircle } from "lucide-react";
import { useAdminBookingsStore } from "@/store/adminBookings.store";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { formatCurrency } from "@/utils/format";

export default function AdminBookingsPage() {
  const { bookings, updateBookingStatus } = useAdminBookingsStore();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) => b.userName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((b) => b.status === statusFilter);
    }

    return result;
  }, [bookings, searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / ITEMS_PER_PAGE));
  const paginatedBookings = filteredBookings.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Bookings Management"
        description="Review all platform reservations, handle cancellations, and monitor revenue."
      />

      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border-slate-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search by name or ID..."
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
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Booking ID</th>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Vehicle & Dates</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="bg-slate-50 py-16 text-center text-sm font-medium text-slate-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((b) => (
                  <tr key={b.id} className="group transition-colors hover:bg-slate-50/70">
                    <td className="px-6 py-4 font-medium text-slate-900">{b.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{b.userName}</div>
                      <div className="text-xs text-slate-500">{b.userEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{b.vehicle}</div>
                      <div className="text-xs text-slate-500">
                        {new Date(b.pickupDate).toLocaleDateString()} - {new Date(b.returnDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{formatCurrency(b.amount)}</td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                          b.status === "confirmed" ? "bg-emerald-50 text-emerald-600 ring-emerald-500/20" :
                          b.status === "pending" ? "bg-amber-50 text-amber-600 ring-amber-500/20" :
                          b.status === "cancelled" ? "bg-red-50 text-red-600 ring-red-500/20" :
                          "bg-blue-50 text-blue-600 ring-blue-500/20"
                       }`}>
                         {b.status.toUpperCase()}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
                          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600" title="View Details">
                            <Eye className="h-4 w-4" />
                          </button>
                          {b.status !== "cancelled" && b.status !== "completed" && (
                            <button 
                              onClick={() => {
                                if(window.confirm("Are you sure you want to cancel this booking?")) {
                                  updateBookingStatus(b.id, "cancelled");
                                }
                              }}
                              className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" 
                              title="Cancel Booking"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
             <span className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-slate-900">{Math.min(page * ITEMS_PER_PAGE, filteredBookings.length)}</span> of <span className="text-slate-900">{filteredBookings.length}</span>
            </span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50">Prev</button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

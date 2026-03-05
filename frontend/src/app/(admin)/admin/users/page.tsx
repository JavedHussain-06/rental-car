"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Ban, Eye, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useAdminUsersStore } from "@/store/adminUsers.store";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog";

export default function AdminUsersPage() {
  const { users, toggleUserStatus, deleteUser } = useAdminUsersStore();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{isOpen: boolean, id: string, name: string}>({ isOpen: false, id: "", name: "" });

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredUsers = useMemo(() => {
    let result = [...users];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [users, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
  const paginatedUsers = filteredUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="User Directory"
        description="Manage customer accounts, disable toxic users, and overview platform engagement."
      />

      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border-slate-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Total Bookings</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="bg-slate-50 py-16 text-center text-sm font-medium text-slate-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((u) => (
                  <tr key={u.id} className={`group transition-colors ${u.status === 'disabled' ? 'bg-slate-50/50 opacity-75' : 'hover:bg-slate-50/70'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                          <Image src={u.avatar} alt={u.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{u.name}</div>
                          <div className="text-xs text-slate-500">{u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{u.email}</div>
                      <div className="text-xs text-slate-500">{u.phone}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{u.totalBookings} Trips</td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                          u.status === "active" ? "bg-emerald-50 text-emerald-600 ring-emerald-500/20" : "bg-slate-100 text-slate-600 ring-slate-500/20"
                       }`}>
                         {u.status === "active" ? "Active" : "Disabled"}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
                          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600" title="View Profile">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => toggleUserStatus(u.id)}
                            className={`rounded-lg p-2 ${u.status === 'active' ? 'text-slate-400 hover:bg-amber-50 hover:text-amber-600' : 'text-amber-500 hover:bg-emerald-50 hover:text-emerald-600'}`}
                            title={u.status === 'active' ? "Disable Account" : "Enable Account"}
                          >
                            {u.status === 'active' ? <Ban className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
             <span className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-slate-900">{Math.min(page * ITEMS_PER_PAGE, filteredUsers.length)}</span> of <span className="text-slate-900">{filteredUsers.length}</span>
            </span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50">Prev</button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, id: "", name: "" })}
        onConfirm={() => {
          deleteUser(deleteDialog.id);
          setDeleteDialog({ isOpen: false, id: "", name: "" });
        }}
        title="Delete User"
        description={`Are you sure you want to permanently delete ${deleteDialog.name}?`}
      />
    </div>
  );
}

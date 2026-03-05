"use client";

import { useMemo } from "react";
import { Car, Users, CalendarDays, IndianRupee } from "lucide-react";
import { useAdminCarsStore } from "@/store/adminCars.store";
import { useAdminBookingsStore } from "@/store/adminBookings.store";
import { useAdminUsersStore } from "@/store/adminUsers.store";
import { AdminStatsCard } from "@/components/admin/AdminStatsCard";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { cars } = useAdminCarsStore();
  const { bookings } = useAdminBookingsStore();
  const { users } = useAdminUsersStore();

  // Compute metrics natively
  const totalRevenue = useMemo(() => {
    return bookings
      .filter((b) => b.status === "completed" || b.status === "confirmed")
      .reduce((sum, b) => sum + b.amount, 0);
  }, [bookings]);

  const activeBookings = useMemo(() => {
    return bookings.filter((b) => b.status === "confirmed" || b.status === "pending").length;
  }, [bookings]);

  // Extract recent 5 transactions
  const recentBookings = [...bookings].reverse().slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor your platform&apos;s high-level KPIs and daily business operations.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatsCard
          title="Total Fleet"
          value={cars.length}
          icon={<Car className="h-6 w-6" />}
          trend={{ value: 12, label: "from last month", isPositive: true }}
        />
        <AdminStatsCard
          title="Active Bookings"
          value={activeBookings}
          icon={<CalendarDays className="h-6 w-6" />}
          trend={{ value: 4, label: "from yesterday", isPositive: true }}
        />
        <AdminStatsCard
          title="Registered Users"
          value={users.length}
          icon={<Users className="h-6 w-6" />}
          description="Total platform accounts."
        />
        <AdminStatsCard
          title="Overall Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<IndianRupee className="h-6 w-6" />}
          trend={{ value: 8, label: "overall growth", isPositive: true }}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Bookings Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="border-b border-slate-200 px-6 py-5 flex justify-between items-center">
             <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
             <Link href="/admin/bookings" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Vehicle</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">{b.userName}</td>
                    <td className="px-6 py-4">{b.vehicle}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{formatCurrency(b.amount)}</td>
                    <td className="px-6 py-4">
                      {/* Temporary inline mapping for booking status */}
                       <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ring-1 ring-inset ${
                          b.status === "confirmed" ? "bg-emerald-50 text-emerald-600 ring-emerald-500/20" :
                          b.status === "pending" ? "bg-amber-50 text-amber-600 ring-amber-500/20" :
                          b.status === "cancelled" ? "bg-red-50 text-red-600 ring-red-500/20" :
                          "bg-blue-50 text-blue-600 ring-blue-500/20"
                       }`}>
                         {b.status.toUpperCase()}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
           <h2 className="mb-6 text-lg font-bold text-slate-900">Quick Actions</h2>
           <div className="space-y-3">
             <Link href="/admin/cars/new" className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50">
               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600"><Car size={20} /></div>
               <div>
                  <p className="font-semibold text-slate-900">Add New Vehicle</p>
                  <p className="text-xs text-slate-500">Register asset to fleet</p>
               </div>
             </Link>
             <Link href="/admin/bookings" className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50">
               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600"><CalendarDays size={20} /></div>
               <div>
                  <p className="font-semibold text-slate-900">Manage Bookings</p>
                  <p className="text-xs text-slate-500">Approve or cancel trips</p>
               </div>
             </Link>
             <Link href="/admin/users" className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50">
               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600"><Users size={20} /></div>
               <div>
                  <p className="font-semibold text-slate-900">User Directory</p>
                  <p className="text-xs text-slate-500">Review customer accounts</p>
               </div>
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
}

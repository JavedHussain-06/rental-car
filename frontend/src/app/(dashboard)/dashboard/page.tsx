"use client";

import { useAuthStore } from "@/store/auth.store";

export default function DashboardOverviewPage() {
  const { user } = useAuthStore();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
        Welcome back, {user?.name.split(" ")[0]}!
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Here is an overview of your account and recent fleet activity.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-6">
          <h3 className="text-sm font-medium text-slate-500">Active Bookings</h3>
          <p className="mt-2 text-3xl font-bold text-slate-900">0</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-6">
          <h3 className="text-sm font-medium text-slate-500">Total Spent</h3>
          <p className="mt-2 text-3xl font-bold text-slate-900">₹0</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-6">
          <h3 className="text-sm font-medium text-slate-500">Account Status</h3>
          <p className="mt-2 text-lg font-bold text-green-600">Verified</p>
        </div>
      </div>
    </div>
  );
}

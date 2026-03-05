"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Save, Bell, Mail, Building2, Banknote, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Mock State for Settings Forms
  const [company, setCompany] = useState({
    name: "One Way Drive India",
    email: "contact@pixelcypher.com",
    phone: "+91 80000 12345",
    address: "Level 4, Tech Park, Andheri East, Mumbai",
  });

  const [pricing, setPricing] = useState({
    defaultPrice: 1500,
    taxPercentage: 18,
    securityDeposit: 5000,
  });

  const [system, setSystem] = useState({
    bookingNotifications: true,
    emailConfirmations: true,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate network delay for realistic SaaS feedback
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    toast({
      title: "Settings Saved",
      description: "Platform configurations have been updated globally.",
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <AdminPageHeader
        title="Platform Settings"
        description="Configure your core business details, operational rules, and system toggles."
      />

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Company Settings */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Company Profile</h2>
              <p className="text-sm text-slate-500">Public details shown on invoices and the website footer.</p>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Company Name</label>
              <input
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Support Email</label>
              <input
                type="email"
                value={company.email}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <input
                value={company.phone}
                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Registered Address</label>
              <input
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing Rules */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Banknote className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Pricing & Billing</h2>
              <p className="text-sm text-slate-500">Configure default tax brackets and holding fees.</p>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Base Price Default (₹)</label>
              <input
                type="number"
                value={pricing.defaultPrice}
                onChange={(e) => setPricing({ ...pricing, defaultPrice: Number(e.target.value) })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Tax Percentage (%)</label>
              <input
                type="number"
                value={pricing.taxPercentage}
                onChange={(e) => setPricing({ ...pricing, taxPercentage: Number(e.target.value) })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Security Deposit (₹)</label>
              <input
                type="number"
                value={pricing.securityDeposit}
                onChange={(e) => setPricing({ ...pricing, securityDeposit: Number(e.target.value) })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Automation Toggles */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">System Automations</h2>
              <p className="text-sm text-slate-500">Enable or disable background tasks and alerts.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="flex cursor-pointer border border-slate-100 rounded-xl p-4 items-center gap-4 transition-colors hover:bg-slate-50">
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                 <Bell className="h-5 w-5" />
               </div>
               <div className="flex-1">
                 <h3 className="font-semibold text-slate-900">Push Notifications</h3>
                 <p className="text-sm text-slate-500">Alert staff when new bookings arrive</p>
               </div>
               <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none overflow-hidden bg-slate-200">
                  <input
                    type="checkbox"
                    checked={system.bookingNotifications}
                    onChange={(e) => setSystem({ ...system, bookingNotifications: e.target.checked })}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
               </div>
            </label>

            <label className="flex cursor-pointer border border-slate-100 rounded-xl p-4 items-center gap-4 transition-colors hover:bg-slate-50">
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                 <Mail className="h-5 w-5" />
               </div>
               <div className="flex-1">
                 <h3 className="font-semibold text-slate-900">Email Invoices</h3>
                 <p className="text-sm text-slate-500">Automatically dispatch PDF receipts to clients</p>
               </div>
               <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none overflow-hidden bg-slate-200">
                  <input
                    type="checkbox"
                    checked={system.emailConfirmations}
                    onChange={(e) => setSystem({ ...system, emailConfirmations: e.target.checked })}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
               </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex min-w-[140px] items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {isSaving ? "Saving..." : <><Save className="h-4 w-4 mr-2" /> Save Settings</>}
          </button>
        </div>
      </form>
    </div>
  );
}

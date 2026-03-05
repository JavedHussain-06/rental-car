"use client";

import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccess("Profile updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-xl">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">Profile Settings</h1>
      <p className="mb-8 text-sm text-slate-500">Update your account information.</p>

      {success && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle className="h-4 w-4 shrink-0" /> {success}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <input
            type="text"
            defaultValue={user?.name}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email Address</label>
          <input
            type="email"
            defaultValue={user?.email}
            disabled
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-500"
          />
          <p className="text-xs text-slate-400">Email cannot be changed.</p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="flex w-fit items-center justify-center rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-70"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

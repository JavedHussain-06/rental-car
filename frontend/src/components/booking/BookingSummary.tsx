"use client";

import { Info } from "lucide-react";
import { formatCurrency } from "@/utils/format";

interface BookingSummaryProps {
  days: number;
  pricePerDay: number;
  subtotal: number;
  tax: number;
  total: number;
}

export function BookingSummary({ days, pricePerDay, subtotal, tax, total }: BookingSummaryProps) {
  if (days <= 0) {
    return (
      <div className="rounded-xl bg-slate-50 p-4 text-center text-sm font-medium text-slate-500 pt-4 cursor-default">
        Select dates to see full pricing details.
      </div>
    );
  }

  return (
    <div className="space-y-3 pt-4 animate-in fade-in duration-300">
      <div className="flex justify-between text-sm text-slate-600">
        <span>{formatCurrency(pricePerDay)} x {days} days</span>
        <span className="font-medium tabular-nums">{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-slate-600 border-b border-slate-100 pb-3">
        <span className="flex items-center gap-1">Taxes & Fees <Info className="h-3.5 w-3.5 text-slate-400" /></span>
        <span className="font-medium tabular-nums">{formatCurrency(tax)}</span>
      </div>
      <div className="flex justify-between pt-1 font-bold text-slate-900">
        <span>Total Price</span>
        <span className="tabular-nums">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

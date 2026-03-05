import { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
}

export function AdminStatsCard({ title, value, description, icon, trend }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <div className="mt-2 flexItems-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {value}
            </span>
          </div>
        </div>
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            {icon}
          </div>
        )}
      </div>

      {trend ? (
        <div className="mt-4 flex items-center gap-2">
          <div
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
              trend.isPositive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </div>
          <span className="text-sm text-slate-500">{trend.label}</span>
        </div>
      ) : description ? (
        <div className="mt-4 text-sm text-slate-500">{description}</div>
      ) : null}
    </div>
  );
}

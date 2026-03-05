import Link from "next/link";
import { Plus } from "lucide-react";

interface Props {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export function AdminPageHeader({ title, description, actionHref, actionLabel }: Props) {
  return (
    <div className="mb-8 sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          {description}
        </p>
      </div>
      {actionHref && actionLabel && (
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href={actionHref}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            {actionLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

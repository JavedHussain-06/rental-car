import Link from "next/link";
import Image from "next/image";
import { MOCK_VEHICLES } from "@/mocks/vehicles.mock";
import { formatCurrency } from "@/utils/format";
import { ArrowRight } from "lucide-react";

export function RelatedVehicles({ currentSlug }: { currentSlug: string }) {
  const related = MOCK_VEHICLES.filter(v => v.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="space-y-6 pt-10 border-t border-slate-200 mt-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Similar Vehicles</h2>
        <Link href="/vehicles" className="group flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
          View all fleet
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((v) => (
          <Link
            key={v.id}
            href={`/vehicles/${v.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image
                src={v.image}
                alt={v.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <div className="font-bold text-slate-900 line-clamp-1">{v.brand} {v.name}</div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 capitalize">{v.transmission} • {v.fuelType}</span>
                <span className="font-bold text-blue-600">{formatCurrency(v.pricePerDay)}<span className="text-xs font-normal text-slate-500">/d</span></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[16/10] w-full animate-pulse bg-slate-200"></div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-6 w-32 animate-pulse rounded bg-slate-200"></div>
            <div className="h-4 w-20 animate-pulse rounded bg-slate-200"></div>
          </div>
          <div className="h-8 w-24 animate-pulse rounded bg-slate-200"></div>
        </div>
        <div className="mb-6 h-4 w-24 animate-pulse rounded bg-slate-200"></div>
        
        <div className="mb-6 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-4">
          <div className="h-10 w-full animate-pulse rounded bg-slate-200"></div>
          <div className="h-10 w-full animate-pulse rounded bg-slate-200"></div>
          <div className="h-10 w-full animate-pulse rounded bg-slate-200"></div>
        </div>
        
        <div className="mt-auto h-12 w-full animate-pulse rounded-xl bg-slate-200"></div>
      </div>
    </div>
  );
}

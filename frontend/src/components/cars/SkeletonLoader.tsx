export function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {/* Image Placeholder */}
          <div className="h-48 w-full animate-pulse bg-slate-200" />
          
          <div className="flex flex-1 flex-col p-5">
            {/* Title & Brand */}
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              </div>
              <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200" />
            </div>

            {/* Features Row */}
            <div className="mb-6 grid grid-cols-3 gap-2">
               <div className="h-8 w-full animate-pulse rounded-lg bg-slate-100" />
               <div className="h-8 w-full animate-pulse rounded-lg bg-slate-100" />
               <div className="h-8 w-full animate-pulse rounded-lg bg-slate-100" />
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="space-y-1">
                 <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
                 <div className="h-6 w-20 animate-pulse rounded bg-slate-200" />
              </div>
              <div className="h-10 w-28 animate-pulse rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

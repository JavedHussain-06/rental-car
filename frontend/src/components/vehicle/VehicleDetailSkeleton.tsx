export function VehicleDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-48 rounded bg-slate-100 animate-pulse mb-8" />
      
      <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
        {/* Left Column Skeleton */}
        <div className="space-y-10">
          {/* Header */}
          <div>
            <div className="h-10 w-3/4 rounded-xl bg-slate-100 animate-pulse" />
            <div className="mt-4 flex gap-4">
              <div className="h-6 w-24 rounded-full bg-slate-100 animate-pulse" />
              <div className="h-6 w-32 rounded-full bg-slate-100 animate-pulse" />
            </div>
          </div>

          {/* Gallery */}
          <div className="space-y-4">
             <div className="aspect-[16/10] w-full rounded-2xl bg-slate-100 animate-pulse" />
             <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(k => <div key={k} className="aspect-video rounded-xl bg-slate-100 animate-pulse" />)}
             </div>
          </div>
          
          <div className="h-40 rounded-2xl bg-slate-100 animate-pulse" />
        </div>

        {/* Right Column Skeleton */}
        <div className="relative hidden lg:block">
          <div className="sticky top-24 h-[440px] rounded-3xl border border-slate-100 bg-slate-50 shadow-sm animate-pulse" />
        </div>
      </div>
    </div>
  );
}

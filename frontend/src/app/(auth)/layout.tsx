import Link from "next/link";
import { Car, ShieldCheck, Zap, HeadphonesIcon } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Pane - Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:flex-none lg:w-[560px] xl:w-[640px]">
        <div className="mx-auto w-full max-w-sm lg:w-[400px]">
          <Link href="/" className="group flex w-fit items-center gap-2.5 text-2xl font-bold text-slate-900 mb-12">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.4)] transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-rotate-3">
              <Car className="h-6 w-6 text-white" />
            </span>
            One Way <span className="text-blue-600">Drive</span>
          </Link>
          {children}
        </div>
      </div>

      {/* Right Pane - Visual (SaaS Premium) */}
      <div className="hidden lg:relative lg:block lg:flex-1">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-blue-600 overflow-hidden">
           <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/30 blur-[120px]" />
           <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[100px]" />
           
           {/* Abstract mesh pattern overlay */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        
        <div className="relative flex h-full flex-col justify-center px-16 xl:px-24">
          <div className="max-w-xl">
            <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              Premium Fleet at <br />
              <span className="text-blue-200">Your Fingertips.</span>
            </h2>
            <p className="text-lg text-blue-100/90 leading-relaxed mb-12">
              Join thousands of verified users traversing India with unmatched reliability, pristine vehicles, and guaranteed transparent availability.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-4 backdrop-blur-md border border-white/10 transition-colors hover:bg-white/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/30 text-blue-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Verified Vehicles</h3>
                  <p className="mt-1 text-sm text-blue-100/70">Every car is multi-point inspected before matching.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-4 backdrop-blur-md border border-white/10 transition-colors hover:bg-white/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/30 text-blue-200">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Instant Booking</h3>
                  <p className="mt-1 text-sm text-blue-100/70">Seamless reservation engine with zero wait times.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-4 backdrop-blur-md border border-white/10 transition-colors hover:bg-white/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/30 text-blue-200">
                  <HeadphonesIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">24/7 Roadside Assist</h3>
                  <p className="mt-1 text-sm text-blue-100/70">Dedicated Indian support lines whenever you need it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

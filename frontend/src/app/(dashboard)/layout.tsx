import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import Link from "next/link";
import { LayoutDashboard, CalendarDays, User } from "lucide-react";

const DASHBOARD_LINKS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Bookings", href: "/dashboard/bookings", icon: CalendarDays },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Navbar />
        
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
          {/* User Sidebar */}
          <aside className="w-full shrink-0 md:w-64">
            <nav className="flex flex-col gap-1">
              {DASHBOARD_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-slate-900 hover:shadow-sm"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main User Content */}
          <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {children}
          </main>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}

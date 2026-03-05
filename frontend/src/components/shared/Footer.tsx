import Link from "next/link";
import { Car, Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  Services: [
    { label: "Self-Drive Rentals", href: "/vehicles" },
    { label: "Chauffeur Service", href: "/chauffeur" },
    { label: "Airport Transfer", href: "/airport" },
    { label: "Corporate Plans", href: "/corporate" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Car className="h-5 w-5 text-white" />
              </span>
              One Way <span className="text-blue-600">Drive</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600">
              India&apos;s trusted car rental platform. Self-drive, chauffeur-driven, or GPS-tracked fleet — we deliver
              mobility you can rely on.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" /> +91 9006412619
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" /> contact@pixelcypher.com
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" /> Mumbai, Maharashtra, India
              </span>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">{group}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} One Way Drive. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
              { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

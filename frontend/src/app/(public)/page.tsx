"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Car,
  MapPin,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Smartphone,
} from "lucide-react";
import { Testimonials } from "@/components/sections/Testimonials";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

/* ─── Static data ─── */
const FEATURES = [
  {
    icon: Car,
    title: "Wide Vehicle Fleet",
    description: "From hatchbacks to SUVs — choose the right car for every trip.",
  },
  {
    icon: MapPin,
    title: "GPS Live Tracking",
    description: "Real-time location updates for every vehicle in our fleet.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Comprehensive insurance coverage on every rental, every time.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support whenever you need us.",
  },
];

const STATS = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Vehicles Available" },
  { value: "50+", label: "Cities Covered" },
  { value: "4.8★", label: "Average Rating" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Choose Your Car", desc: "Browse our curated fleet and pick the perfect vehicle." },
  { step: "02", title: "Book Instantly", desc: "Select dates, confirm your details, and pay securely via Razorpay." },
  { step: "03", title: "Drive & Track", desc: "Pick up the keys and enjoy live GPS tracking throughout your trip." },
];

/* ─── Page ─── */
export default function HomePage() {
  const router = useRouter();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700"
              >
                <Star className="h-3.5 w-3.5" /> Rated #1 Car Rental in India
              </motion.div>

              <motion.h1
                custom={0.1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              >
                Drive Your Way,
                <br />
                <span className="text-blue-600">Anywhere in India</span>
              </motion.h1>

              <motion.p
                custom={0.2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mt-5 max-w-lg text-lg text-slate-600"
              >
                Self-drive or chauffeur-driven — book premium vehicles with real-time GPS tracking,
                transparent pricing, and instant Razorpay checkout.
              </motion.p>

              <motion.div
                custom={0.3}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  href="/vehicles"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                >
                  Browse Vehicles <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:shadow-md"
                >
                  How It Works
                </Link>
              </motion.div>

              <motion.div
                custom={0.4}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
              >
                {["No hidden charges", "GPS tracking included", "Instant booking"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-green-500" /> {item}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Hero illustration placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover="hover"
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => router.push("/vehicles")}
              className="relative hidden lg:block cursor-pointer group"
            >
              <div className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="relative mt-4 flex h-48 w-full flex-col items-center justify-end overflow-hidden">
                    {/* Layer 4 — Clouds (very slow) */}
                    <motion.div
                      initial={false}
                      variants={{
                        hover: {
                          x: ["0%", "-50%"],
                          transition: { repeat: Infinity, duration: 25, ease: "linear" },
                        },
                      }}
                      className="absolute top-4 left-0 flex w-[200%] items-center"
                    >
                      {/* Cloud set 1 (0 to 50%) */}
                      <div className="flex w-1/2 justify-around px-8 opacity-40">
                        <svg width="48" height="24" viewBox="0 0 24 12" fill="white"><path d="M18 12H5C2.24 12 0 9.76 0 7c0-2.52 1.88-4.63 4.31-4.95C4.94 1 6.84 0 9 0c2.4 0 4.42 1.63 4.91 3.86C14.47 3.32 15.21 3 16 3c2.21 0 4 1.79 4 4 0 .34-.04.67-.12 1h.12c2.21 0 4 1.79 4 4s-1.79 4-4 4z" /></svg>
                        <svg width="64" height="32" viewBox="0 0 24 12" fill="white" className="mt-4"><path d="M18 12H5C2.24 12 0 9.76 0 7c0-2.52 1.88-4.63 4.31-4.95C4.94 1 6.84 0 9 0c2.4 0 4.42 1.63 4.91 3.86C14.47 3.32 15.21 3 16 3c2.21 0 4 1.79 4 4 0 .34-.04.67-.12 1h.12c2.21 0 4 1.79 4 4s-1.79 4-4 4z" /></svg>
                        <svg width="40" height="20" viewBox="0 0 24 12" fill="white" className="-mt-2"><path d="M18 12H5C2.24 12 0 9.76 0 7c0-2.52 1.88-4.63 4.31-4.95C4.94 1 6.84 0 9 0c2.4 0 4.42 1.63 4.91 3.86C14.47 3.32 15.21 3 16 3c2.21 0 4 1.79 4 4 0 .34-.04.67-.12 1h.12c2.21 0 4 1.79 4 4s-1.79 4-4 4z" /></svg>
                      </div>
                      {/* Cloud set 2 (50% to 100% duplicate for seamless loop) */}
                      <div className="flex w-1/2 justify-around px-8 opacity-40">
                        <svg width="48" height="24" viewBox="0 0 24 12" fill="white"><path d="M18 12H5C2.24 12 0 9.76 0 7c0-2.52 1.88-4.63 4.31-4.95C4.94 1 6.84 0 9 0c2.4 0 4.42 1.63 4.91 3.86C14.47 3.32 15.21 3 16 3c2.21 0 4 1.79 4 4 0 .34-.04.67-.12 1h.12c2.21 0 4 1.79 4 4s-1.79 4-4 4z" /></svg>
                        <svg width="64" height="32" viewBox="0 0 24 12" fill="white" className="mt-4"><path d="M18 12H5C2.24 12 0 9.76 0 7c0-2.52 1.88-4.63 4.31-4.95C4.94 1 6.84 0 9 0c2.4 0 4.42 1.63 4.91 3.86C14.47 3.32 15.21 3 16 3c2.21 0 4 1.79 4 4 0 .34-.04.67-.12 1h.12c2.21 0 4 1.79 4 4s-1.79 4-4 4z" /></svg>
                        <svg width="40" height="20" viewBox="0 0 24 12" fill="white" className="-mt-2"><path d="M18 12H5C2.24 12 0 9.76 0 7c0-2.52 1.88-4.63 4.31-4.95C4.94 1 6.84 0 9 0c2.4 0 4.42 1.63 4.91 3.86C14.47 3.32 15.21 3 16 3c2.21 0 4 1.79 4 4 0 .34-.04.67-.12 1h.12c2.21 0 4 1.79 4 4s-1.79 4-4 4z" /></svg>
                      </div>
                    </motion.div>



                    {/* Car Illustration (Static, only wheels animate) */}
                    <div className="relative z-20 w-3/4 max-w-[220px] pb-2 drop-shadow-xl">
                      {/* Custom SVG Car Component */}
                      {/* Custom SVG Car Component */}
                      <svg viewBox="0 0 100 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-white overflow-visible">
                        <defs>
                          {/* Narrower, more realistic triangular beam gradient */}
                          <linearGradient id="headlight-beam" x1="98" y1="29" x2="220" y2="38" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.6" />
                            <stop offset="50%" stopColor="#fef08a" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Car Body */}
                        <path d="M15 15 C 20 5, 30 5, 45 5 L 60 5 C 75 5, 80 15, 85 18 L 93 20 C 97 21, 98 25, 98 28 L 98 35 C 98 38, 95 40, 92 40 L 85 40 C 85 35, 75 35, 75 40 L 25 40 C 25 35, 15 35, 15 40 L 8 40 C 5 40, 2 38, 2 35 L 2 25 C 2 20, 5 15, 15 15 Z" fill="currentColor" opacity="0.95" />

                        {/* Windows */}
                        <path d="M 22 17 C 25 8, 32 8, 45 8 L 56 8 C 65 8, 70 14, 73 17 L 73 18 L 20 18 C 20 18, 20 17, 22 17 Z" fill="#3b82f6" />
                        <rect x="44" y="8" width="2" height="10" fill="currentColor" />

                        {/* Door Outlines */}
                        <path d="M 45 18 L 45 40 M 22 18 L 18 40 M 73 18 L 76 40" stroke="#cbd5e1" strokeWidth="0.75" fill="none" opacity="0.8" />

                        {/* Door Handles */}
                        <rect x="35" y="21" width="4" height="1.5" rx="0.5" fill="#94a3b8" />
                        <rect x="52" y="21" width="4" height="1.5" rx="0.5" fill="#94a3b8" />

                        {/* Tail Lights (Red Glow) */}
                        <g className="opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          <path d="M 2 27 L 2 31 L 5 31 L 5 27 Z" fill="#ef4444" />
                          <circle cx="3" cy="29" r="4" fill="#ef4444" opacity="0.4" className="blur-sm" />
                        </g>

                        {/* Headlights & Realistic Narrow Beam */}
                        <g className="opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          {/* Hardware Lamp */}
                          <path d="M 98 26 L 98 32 L 94 32 L 94 26 Z" fill="#fef08a" />
                          <circle cx="96" cy="29" r="5" fill="#fef08a" opacity="0.6" className="blur-sm" />
                          {/* Light Cone Projecting Onto Road */}
                          <path
                            d="M 98 26 L 220 22 L 220 40 L 98 32 Z"
                            fill="url(#headlight-beam)"
                            opacity="0.5"
                            className="blur-sm"
                          />
                        </g>

                        {/* Front Wheel */}
                        <circle cx="80" cy="40" r="6" fill="#1e293b" />
                        <circle
                          cx="80"
                          cy="40"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          fill="transparent"
                          className="origin-[80px_40px] group-hover:animate-[spin_0.3s_linear_infinite]"
                        />

                        {/* Rear Wheel */}
                        <circle cx="20" cy="40" r="6" fill="#1e293b" />
                        <circle
                          cx="20"
                          cy="40"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          fill="transparent"
                          className="origin-[20px_40px] group-hover:animate-[spin_0.3s_linear_infinite]"
                        />
                      </svg>
                    </div>

                    {/* Layer 1 — Road Dashes (fast) */}
                    <div className="absolute bottom-2 left-0 w-full overflow-hidden h-1.5 z-10 flex">
                      <motion.div
                        initial={false}
                        variants={{
                          hover: {
                            x: ["0%", "-50%"],
                            transition: { repeat: Infinity, duration: 0.6, ease: "linear" },
                          },
                        }}
                        className="flex w-[200%]"
                      >
                        {/* Flatter, longer dashed lines mimicking highway striping */}
                        <div
                          className="h-[3px] w-[200%] opacity-70 mt-[1.5px]"
                          style={{
                            backgroundImage: "repeating-linear-gradient(to right, white, white 36px, transparent 36px, transparent 64px)",
                            backgroundSize: "64px 100%"
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>

                  <p className="mt-8 text-xl font-semibold">Fleet Preview</p>
                  <p className="text-sm text-blue-200">500+ vehicles available</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-3xl font-extrabold text-blue-600">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold text-slate-900">Why Choose One Way Drive?</h2>
            <p className="mt-3 text-slate-500">Everything you need for a seamless rental experience.</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-extrabold text-slate-900">How It Works</h2>
            <p className="mt-3 text-slate-500">Book your car in three simple steps.</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                custom={i * 0.15}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative"
              >
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute right-0 top-6 hidden h-0.5 w-1/2 bg-blue-100 md:block" />
                )}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── CTA ── */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-white">
              <h2 className="text-2xl font-extrabold">Ready to hit the road?</h2>
              <p className="mt-1 text-blue-200">Browse our fleet and book instantly.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow transition-all hover:shadow-lg"
              >
                <Car className="h-4 w-4" /> Browse Vehicles
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700"
              >
                <Smartphone className="h-4 w-4" /> Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    city: "Mumbai",
    initials: "RS",
    color: "bg-blue-600",
    review:
      "Booking a one-way car has never been easier. The process was smooth and the vehicle quality was excellent.",
  },
  {
    name: "Priya Patel",
    city: "Ahmedabad",
    initials: "PP",
    color: "bg-emerald-600",
    review:
      "Transparent pricing and instant booking. One Way Drive saved me hours of travel planning.",
  },
  {
    name: "Arjun Mehta",
    city: "Delhi",
    initials: "AM",
    color: "bg-violet-600",
    review:
      "Reliable cars and great customer support. Highly recommend for intercity travel.",
  },
  {
    name: "Sneha Iyer",
    city: "Bangalore",
    initials: "SI",
    color: "bg-amber-600",
    review:
      "Used One Way Drive for a weekend trip — seamless experience from pickup to drop. Will definitely book again!",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

export function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-extrabold text-slate-900">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-slate-500">
            Trusted by thousands of travelers across India.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i * 0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${t.color}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

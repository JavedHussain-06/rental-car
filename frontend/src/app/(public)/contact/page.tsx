import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Contact Us</h1>
      <p className="text-lg text-slate-600 mb-12">We&apos;re here to help! Reach out to us anytime.</p>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-slate-900">Email</h3>
          <p className="mt-1 text-sm text-slate-500">contact@pixelcypher.com</p>
        </div>
        
        <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Phone className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-slate-900">Phone</h3>
          <p className="mt-1 text-sm text-slate-500">+91 98765 43210</p>
        </div>
        
        <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-slate-900">Office</h3>
          <p className="mt-1 text-sm text-slate-500">Tech Park, Bangalore</p>
        </div>
      </div>
    </div>
  );
}

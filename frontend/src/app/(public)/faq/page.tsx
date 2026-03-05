export default function FAQPage() {
  const FAQS = [
    {
      q: "What documents do I need to rent a car?",
      a: "You must provide a valid driving license (issued at least 1 year ago) and a government ID (Aadhar/Passport)."
    },
    {
      q: "Is there a security deposit?",
      a: "Yes, a refundable security deposit is required for all bookings. It varies by vehicle class."
    },
    {
      q: "What is your cancellation policy?",
      a: "Cancellations made 24 hours prior to the start time receive a full refund. After that, a 1-day rental fee is deducted."
    },
    {
      q: "Do you offer inter-state travel?",
      a: "Yes, all our vehicles are registered with commercial All-India Tourist permits."
    }
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Frequently Asked Questions</h1>
      <p className="text-lg text-slate-600 mb-12">Everything you need to know about renting with One Way Drive.</p>
      
      <div className="space-y-6">
        {FAQS.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{faq.q}</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

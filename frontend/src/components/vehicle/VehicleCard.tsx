export function VehicleCard({ name, pricePerDay }: { name: string; pricePerDay: number }) {
  return (
    <article className="rounded-lg border border-slate-200 p-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-1 text-sm text-slate-600">INR {pricePerDay} / day</p>
    </article>
  );
}

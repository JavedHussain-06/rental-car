interface Props {
  status: "available" | "maintenance";
}

export function AvailabilityBadge({ status }: Props) {
  if (status === "available") {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-500/20">
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
        Available Now
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600 ring-1 ring-inset ring-rose-500/20">
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-rose-500"></span>
      In Maintenance
    </span>
  );
}

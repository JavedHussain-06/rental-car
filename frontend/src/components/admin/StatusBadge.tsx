import { IAdminCar } from "@/mocks/adminCars.mock";

interface Props {
  status: IAdminCar["status"];
}

export function StatusBadge({ status }: Props) {
  switch (status) {
    case "available":
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-500/20">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          Available
        </span>
      );
    case "maintenance":
      return (
        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600 ring-1 ring-inset ring-amber-500/20">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-500"></span>
          Maintenance
        </span>
      );
    case "inactive":
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-500/20">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-slate-500"></span>
          Inactive
        </span>
      );
  }
}

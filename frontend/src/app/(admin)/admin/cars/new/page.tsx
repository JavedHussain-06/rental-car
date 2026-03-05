import { CarForm } from "@/components/admin/CarForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Register Vehicle",
};

export default function AddCarPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <AdminPageHeader
        title="Register New Vehicle"
        description="Add a new master record to your global fleet deployment directly to the active system."
      />
      <CarForm />
    </div>
  );
}

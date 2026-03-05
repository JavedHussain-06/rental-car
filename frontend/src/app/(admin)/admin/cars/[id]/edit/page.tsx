"use client";

import { useAdminCarsStore } from "@/store/adminCars.store";
import { CarForm } from "@/components/admin/CarForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { IAdminCar } from "@/mocks/adminCars.mock";

export default function EditCarPage() {
  const params = useParams();
  const router = useRouter();
  const { cars } = useAdminCarsStore();
  const [car, setCar] = useState<IAdminCar | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Basic Hydration protection + Zustand syncing
    const found = cars.find((c) => c.id === params.id);
    if (!found) {
      router.push("/admin/cars");
      return;
    }
    setCar(found);
    setIsReady(true);
  }, [params.id, cars, router]);

  if (!isReady || !car) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <AdminPageHeader
        title="Edit Vehicle"
        description={`Modify the properties of ${car.brand} ${car.name}.`}
      />
      <CarForm initialData={car} isEditing={true} />
    </div>
  );
}

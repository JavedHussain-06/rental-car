import { CarTable } from "@/components/admin/CarTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Fleet Management",
};

export default function AdminCarsPage() {
  return <CarTable />;
}

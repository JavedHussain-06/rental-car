import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Vehicle Details | One Way Drive",
  description: "Rent premium vehicles at the best price.",
};

export default function VehicleDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

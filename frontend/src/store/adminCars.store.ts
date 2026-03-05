import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAdminCar, ADMIN_MOCK_CARS } from "@/mocks/adminCars.mock";

interface AdminCarsState {
    cars: IAdminCar[];
    addCar: (car: Omit<IAdminCar, "id">) => void;
    updateCar: (id: string, data: Partial<IAdminCar>) => void;
    deleteCar: (id: string) => void;
    toggleStatus: (id: string) => void;
}

export const useAdminCarsStore = create<AdminCarsState>()(
    persist(
        (set) => ({
            cars: ADMIN_MOCK_CARS,

            addCar: (carData) =>
                set((state) => ({
                    cars: [
                        ...state.cars,
                        { ...carData, id: `car-${Date.now()}` },
                    ],
                })),

            updateCar: (id, data) =>
                set((state) => ({
                    cars: state.cars.map((car) =>
                        car.id === id ? { ...car, ...data } : car
                    ),
                })),

            deleteCar: (id) =>
                set((state) => ({
                    cars: state.cars.filter((car) => car.id !== id),
                })),

            toggleStatus: (id) =>
                set((state) => ({
                    cars: state.cars.map((car) => {
                        if (car.id === id) {
                            const newStatus =
                                car.status === "available"
                                    ? "inactive"
                                    : car.status === "inactive"
                                        ? "maintenance"
                                        : "available";
                            return { ...car, status: newStatus };
                        }
                        return car;
                    }),
                })),
        }),
        {
            name: "admin-cars-storage", // stores in localStorage
        }
    )
);

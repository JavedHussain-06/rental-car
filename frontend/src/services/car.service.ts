import { api } from "@/lib/axios";
import { GetCarsParams, ICar } from "@/types/car.types";
import { PaginatedResponse, ApiResponse } from "@/types/api.types";
import { MOCK_CARS } from "@/mocks/cars.mock";

export const carService = {
    getCars: async (params?: GetCarsParams) => {
        const cleanParams: Record<string, unknown> = Object.fromEntries(
            Object.entries(params || {}).filter(([k, v]) => v !== undefined && v !== "")
        );

        try {
            if (process.env.NEXT_PUBLIC_USE_MOCK !== "true") {
                return await api.get<PaginatedResponse<ICar>>("/cars", { params: cleanParams });
            }
            throw new Error("Mock forced");
        } catch {
            // ─── FALLBACK: MOCK DATA PREP ───
            return new Promise<import("axios").AxiosResponse<PaginatedResponse<ICar>>>((resolve) => {
                setTimeout(() => {
                    let filteredCars = [...MOCK_CARS];

                    // 1. Search filter
                    if (cleanParams.search) {
                        const query = String(cleanParams.search).toLowerCase();
                        filteredCars = filteredCars.filter(
                            (c) =>
                                c.brand.toLowerCase().includes(query) ||
                                c.name.toLowerCase().includes(query)
                        );
                    }

                    // 2. Exact match filters
                    if (cleanParams.transmission) {
                        filteredCars = filteredCars.filter((c) => c.transmission === cleanParams.transmission);
                    }
                    if (cleanParams.fuelType) {
                        filteredCars = filteredCars.filter((c) => c.fuelType === cleanParams.fuelType);
                    }
                    if (cleanParams.seats) {
                        filteredCars = filteredCars.filter((c) => c.seats === Number(cleanParams.seats));
                    }

                    // 3. Price Range
                    if (cleanParams.maxPrice) {
                        filteredCars = filteredCars.filter((c) => c.pricePerDay <= Number(cleanParams.maxPrice));
                    }
                    if (cleanParams.minPrice) {
                        filteredCars = filteredCars.filter((c) => c.pricePerDay >= Number(cleanParams.minPrice));
                    }

                    // 4. Availability
                    if (cleanParams.isAvailable === "true" || cleanParams.isAvailable === true) {
                        filteredCars = filteredCars.filter((c) => c.status === "available");
                    }

                    // 5. Sorting
                    const sortStr = cleanParams.sort || "-createdAt";
                    filteredCars.sort((a, b) => {
                        if (sortStr === "pricePerDay") return a.pricePerDay - b.pricePerDay;
                        if (sortStr === "-pricePerDay") return b.pricePerDay - a.pricePerDay;
                        if (sortStr === "-createdAt") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                        if (sortStr === "createdAt") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                        return 0;
                    });

                    // 6. Pagination
                    const page = Number(cleanParams.page) || 1;
                    const limit = Number(cleanParams.limit) || 9;
                    const total = filteredCars.length;
                    const pages = Math.ceil(total / limit);
                    const startIndex = (page - 1) * limit;

                    const paginatedData = filteredCars.slice(startIndex, startIndex + limit);

                    resolve({
                        data: {
                            success: true,
                            message: "Cars fetched from mock fallback",
                            data: paginatedData,
                            pagination: { total, page, limit, pages },
                        },
                        status: 200,
                        statusText: "OK",
                        headers: {},
                        config: { headers: {} } as import("axios").InternalAxiosRequestConfig,
                    });
                }, 800); // Simulate network delay
            });
        }
    },

    getCarBySlug: async (slug: string) => {
        try {
            if (process.env.NEXT_PUBLIC_USE_MOCK !== "true") {
                return await api.get<ApiResponse<ICar>>(`/cars/${slug}`);
            }
            throw new Error("Mock forced");
        } catch {
            return new Promise<import("axios").AxiosResponse<ApiResponse<ICar>>>((resolve, reject) => {
                setTimeout(() => {
                    const car = MOCK_CARS.find(c => c.slug === slug);
                    if (car) {
                        resolve({
                            data: { success: true, message: "Fetched mock car", data: car },
                            status: 200,
                            statusText: "OK",
                            headers: {},
                            config: { headers: {} } as import("axios").InternalAxiosRequestConfig,
                        });
                    } else {
                        reject({ response: { data: { message: "Car not found" } } });
                    }
                }, 500);
            });
        }
    },
};

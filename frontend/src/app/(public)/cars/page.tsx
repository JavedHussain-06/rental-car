"use client";

import { useEffect, useState } from "react";
import { FilterSidebar } from "@/components/cars/FilterSidebar";
import { SortDropdown } from "@/components/cars/SortDropdown";
import { CarCard } from "@/components/cars/CarCard";
import { SkeletonLoader } from "@/components/cars/SkeletonLoader";
import { EmptyState } from "@/components/cars/EmptyState";
import { Pagination } from "@/components/cars/Pagination";
import { useCarStore } from "@/store/car.store";
import { carService } from "@/services/car.service";
import { ICar } from "@/types/car.types";
import { SlidersHorizontal, X } from "lucide-react";

export default function BrowseVehiclesPage() {
  const { filters, page, sort, resetFilters } = useCarStore();
  
  const [cars, setCars] = useState<ICar[]>([]);
  const [totalCars, setTotalCars] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Debounced API call effect
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const response = await carService.getCars({
          ...filters,
          seats: filters.seats === "" ? undefined : filters.seats,
          page,
          limit: 9,
          sort,
        });
        
        const { data, pagination } = response.data;
        setCars(data);
        setTotalCars(pagination.total);
        setTotalPages(pagination.pages);
      } catch (error) {
        console.error("Failed to fetch cars", error);
        // For production, toast error here. Fallback to empty state.
        setCars([]);
        setTotalCars(0);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce to prevent rapid API calls while user is dragging sliders or typing
    const timeoutId = setTimeout(() => {
      fetchCars();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [filters, page, sort]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Premium Header */}
      <div className="bg-slate-900 text-white py-16 px-4 mb-8">
         <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Browse Vehicles
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Find your perfect ride from our premium fleet. Whether you need an electric city cruiser or a fully manual SUV for the mountains, we have you covered.
            </p>
         </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Mobile controls */}
        <div className="flex items-center justify-between lg:hidden mb-6">
           <button 
             onClick={() => setIsMobileFiltersOpen(true)}
             className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm border border-slate-200"
           >
             <SlidersHorizontal className="h-4 w-4" />
             Filters
           </button>
           <SortDropdown />
        </div>

        {/* Mobile Filter Drawer Overlay */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="relative z-10 w-full max-w-xs overflow-y-auto bg-white px-4 py-6 shadow-xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-lg font-bold">Filters</h2>
                 <button onClick={() => setIsMobileFiltersOpen(false)} className="rounded-lg p-2 hover:bg-slate-100">
                    <X className="h-5 w-5 text-slate-500" />
                 </button>
              </div>
              <FilterSidebar />
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Sidebar Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Main Grid Area */}
          <div className="flex-1 w-full">
            {/* Results Header */}
            <div className="mb-6 hidden lg:flex items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-sm font-medium text-slate-600">
                Found <span className="font-bold text-slate-900">{totalCars}</span> premium vehicle{totalCars === 1 ? '' : 's'}
              </p>
              <SortDropdown />
            </div>

            {/* Loading / Empty / Content Logic */}
            {isLoading ? (
              <SkeletonLoader />
            ) : cars.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {cars.map((car) => (
                    <CarCard key={car._id} car={car} />
                  ))}
                </div>
                <Pagination totalPages={totalPages} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

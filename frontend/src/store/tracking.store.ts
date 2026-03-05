import { create } from "zustand";
import { VehicleLiveLocation, GpsCoordinate } from "@/types/tracking.types";

interface TrackingState {
  trackedVehicles: Map<string, VehicleLiveLocation>;
  userLocation: GpsCoordinate | null;
  isTracking: boolean;
  setVehicleLocation: (vehicleId: string, location: VehicleLiveLocation) => void;
  setUserLocation: (location: GpsCoordinate | null) => void;
  setTracking: (tracking: boolean) => void;
  clearTracking: () => void;
}

export const useTrackingStore = create<TrackingState>((set) => ({
  trackedVehicles: new Map(),
  userLocation: null,
  isTracking: false,
  setVehicleLocation: (vehicleId, location) =>
    set((state) => {
      const next = new Map(state.trackedVehicles);
      next.set(vehicleId, location);
      return { trackedVehicles: next };
    }),
  setUserLocation: (userLocation) => set({ userLocation }),
  setTracking: (isTracking) => set({ isTracking }),
  clearTracking: () => set({ trackedVehicles: new Map(), isTracking: false }),
}));

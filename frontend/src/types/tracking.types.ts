/* ─── Live GPS coordinate ─── */
export interface GpsCoordinate {
  lat: number;
  lng: number;
  timestamp: string; // ISO 8601
}

/* ─── Historical tracking point ─── */
export interface TrackingPoint extends GpsCoordinate {
  speed?: number; // km/h
  heading?: number; // degrees 0-359
  accuracy?: number; // metres
}

/* ─── Vehicle live location (GPS-ready) ─── */
export interface VehicleLiveLocation {
  vehicleId: string;
  location: GpsCoordinate;
  deviceId?: string;
}

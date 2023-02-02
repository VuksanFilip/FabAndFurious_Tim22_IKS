import { Route, Location } from './Location';
import { IdEmail } from './User';
import { ReasonAndTimeOfRejection } from './Rejection';

// export interface Ride {
//   id: number;
//   startTime: string;
//   endTime: string;
//   totalCost: number;
//   driver: IdEmail;
//   passengers: IdEmail[];
//   estimatedTimeInMinutes: number;
//   // vehicleVehicleName: ?;
//   babyTransport: boolean;
//   petTransport: boolean;
//   rejection: ReasonAndTimeOfRejection;
//   locations: Path[];
//   status: String;
// }

export interface RideWithNoStatus {
  id: number;
  startTime: string;
  endTime: string;
  totalCost: number;
  driver: IdEmail;
  passengers: IdEmail[];
  estimatedTimeInMinutes: number;
  vehicleVehicleName: string;
  babyTransport: boolean;
  petTransport: boolean;
  rejection: ReasonAndTimeOfRejection;
  locations: Route[];
}

export interface Ride {
  id: number;
  startTime: string;
  endTime: string;
  totalCost: number;
  driver: IdEmail;
  passengers: IdEmail[];
  estimatedTimeInMinutes: number;
  vehicleVehicleName: string;
  babyTransport: boolean;
  petTransport: boolean;
  rejection: ReasonAndTimeOfRejection;
  locations: Route[];
  status: string;
  sheduledTime: string;
}

export interface RideFavorite {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  totalCost: number;
  driver: IdEmail;
  passengers: IdEmail[];
  estimatedTimeInMinutes: number;
  vehicleVehicleName: string;
  babyTransport: boolean;
  petTransport: boolean;
  rejection: ReasonAndTimeOfRejection;
  locations: Route[];
  status: string;
}

export interface RequestRide {
  locations: Route[];
  passengers: IdEmail[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
  scheduledTime: string;
}

export interface PageRides {
  totalCount: number;
  results: Ride[];
}

export interface CurrentRidePassenger {
  startTime: string;
  endTime: string;
  driverEmail: string;
  estimatedTimeInMinutes: number;
  vehicleType: string;
  babies: boolean;
  pets: boolean;
  departure: Location;
  destination: Location;
  scheduledTime: string;
}

export interface CurrentRideDriver {
  startTime: string;
  endTime: string;
  passengerEmail: string;
  estimatedTimeInMinutes: number;
  vehicleType: string;
  babies: boolean;
  pets: boolean;
  departure: Location;
  destination: Location;
  scheduledTime: string;
}

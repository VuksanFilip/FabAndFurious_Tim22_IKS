import { Route } from './Location';
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
  status: string;
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

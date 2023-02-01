import { Path } from "./Location";
import { IdEmail } from "./User";
import { ReasonAndTimeOfRejection } from "./Rejection"

export interface Ride{
    id: number;
    startTime: string;
    endTime: string;
    totalCost: number;
    driver: IdEmail
    passengers: IdEmail[];
    estimatedTimeInMinutes: number;
    // vehicleVehicleName: ?;
    babyTransport: boolean;
    petTransport: boolean;
    rejection: ReasonAndTimeOfRejection;
    locations: Path[];
    status: String;
}



export interface RideWithNoStatus{
    id: number;
    startTime: string;
    endTime: string;
    totalCost: number;
    driver: IdEmail
    passengers: IdEmail[];
    estimatedTimeInMinutes: number;
    vehicleVehicleName: string;
    babyTransport: boolean;
    petTransport: boolean;
    rejection: ReasonAndTimeOfRejection;
    locations: Path[];
}

export interface RequestRide{
    locations: Path[];
    passengers: IdEmail[];
    // vehicleVehicleName: ?;
    babyTransport: boolean;
    petTransport: boolean;
    scheduledTime: string;
}

export interface PageRides{
    totalCount: number;
    results: Ride[];
}
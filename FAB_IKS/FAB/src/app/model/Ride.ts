import { Path } from "./Location";
import { IdEmail } from "./User";
import { ReasonAndTimeOfRejection } from "./Rejection"
import { map } from "leaflet";
import { Vehicle } from "./Vehicle";

export interface RideWithScheduledTime{
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
    status: String;
    scheduledTime: string;
}

export interface Ride{
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

export interface PanicRide{

    id: string;
    startTime: string;
    endTime: string;
    totalCost: number;
    driver: IdEmail;
    passengers: IdEmail[];
    estimatedTimeInMinute: number;
    vehicleType: Vehicle;
    babyTransport: boolean;
    petTransport: boolean;
    rejection: ReasonAndTimeOfRejection;
    locations: Map<String, Location>;

}

export interface RequestRide{
    locations: Path[];
    passengers: IdEmail[];
    vehicleVehicleName: string;
    babyTransport: boolean;
    petTransport: boolean;
    scheduledTime: string;
}

export interface PageRides{
    totalCount: number;
    results: Ride[];
}
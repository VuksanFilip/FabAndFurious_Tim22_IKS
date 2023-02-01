import { Location } from "./Location";

export interface RequestDriverVehicle{
    vehicleType: string;
    model: string;
    licenseNumber: string;
    currentLocation: Location;
    passengerSeats: number;
    babyTransport: boolean;
    petTransport: boolean;
}

export interface VehicleDriverProfile{
    id: number;
    driverId: number;
    vehicleType: string;
    model: string;
    licenseNumber: string;
    currentLocation: Location;
    passengerSeats: number;
    babyTransport: boolean;
    petTransport: boolean;
}
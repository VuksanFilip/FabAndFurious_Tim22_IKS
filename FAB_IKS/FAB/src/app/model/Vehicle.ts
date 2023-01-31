import { Location } from "./Location";


export interface Vehicle{
    id: number;
    vehicleName: string;
    pricePerKm: number;
}

export interface RequestDriverVehicle{
    id: number;
    driverId: number;
    vehicleVehicleName: string;
    model: string;
    licenseNumber: string;
    currentLocation: Location;
    passengerSeats: number;
    babyTransport: boolean;
    petTransport: boolean;
}

export interface RequestDriverVehicle{
    vehicleVehicleName: string;
    model: string;
    licenseNumber: string;
    currentLocation: Location;
    passengerSeats: number;
    babyTransport: boolean;
    petTransport: boolean;
}
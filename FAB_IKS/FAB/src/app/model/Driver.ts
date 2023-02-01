import { RideWithNoStatus } from "./Ride";

export interface DriverWithNoId{
    name: string;
    surname: string;
    profilePicture: string;
    telephoneNumber: string;
    email: string;
    address: string;
    password: string;
}

export interface DriverWithNoPassword{
    id: number;
    name: string;
    surname: string;
    profilePicture: string;
    telephoneNumber: string;
    email: string;
    address: string;
}

export interface WorkingHour{
    id: number;
    start: string;
    end: string;
}

export interface StartingWorkingHour{
    start: string;
}

export interface EndingWorkingHour{
    end: string;
}

export interface DriverRides{
    totalCount: number;
    results: RideWithNoStatus[];
}


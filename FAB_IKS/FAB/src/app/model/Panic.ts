import { RideWithNoStatus } from "./Ride";
import { UserWithNoIdNoPassword } from "./User";

export interface Reason{
    reason: string;
}

export interface Panic{
    id: number;
    user: UserWithNoIdNoPassword;
    ride: RideWithNoStatus;
    time: string;
    reason: string;
}

export interface Panic{
    id: number;
    user: UserWithNoIdNoPassword;
    ride: RideWithNoStatus;
    time: string;
    reason: string;
}
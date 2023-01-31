import { Path } from "./Location";

export interface Assumption{
    locations: Path[];
    vehicleType: string;
    babyTransport: boolean;
    petTransport: boolean;
}

export interface EstimatedValues{
    estimatedTimeInMinutes: number;
    estimatedCost: number;
}
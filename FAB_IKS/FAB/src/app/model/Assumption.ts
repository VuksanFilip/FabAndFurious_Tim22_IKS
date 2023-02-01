// private List<RequestLocationAssumptionDTO> locations;
// private VehicleName vehicleType;
// private boolean babyTransport;
// private boolean petTransport;

import { Route } from "./Location";

export interface EstimatedValues{
    estimatedTimeInMinutes: number;
    estimatedCost: number;
}

export interface AssumptionRequest{
    locations: Route[];
    vehicleType: string;
    babyTransport: boolean;
    petTransport: boolean;
}
import { IdEmail } from "./User";

export interface Location{
    address: string;
    latitude: number;
    longitude: number;
}

export interface Path{
    departure: Location;
    destination: Location;
}

export interface FavoriteRoutes{
    id: string
    favoriteName: string;
    scheduledTime: string;
    locations: Path[];
    passengers: IdEmail[];
    vehicleType: string;
    babyTransport: boolean;
    petTransport: boolean;   
}

export interface FavoriteRoutesWithNoId{
    favoriteName: string;
    scheduledTime: string;
    locations: Path[];
    passengers: IdEmail[];
    vehicleType: string;
    babyTransport: boolean;
    petTransport: boolean;  
}

export interface FavouriteRoutesWithNoIdNoScheduledTime{
    favoriteName: string;
    locations: Path[];
    passengers: IdEmail[];
    vehicleType: string;
    babyTransport: boolean;
    petTransport: boolean;   
}


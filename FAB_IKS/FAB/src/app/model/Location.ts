export interface Location{
    address: string;
    latitude: number;
    longitude: number;
}

export interface Route{
    departure: Location;
    destination: Location;
}


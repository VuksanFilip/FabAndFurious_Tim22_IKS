export interface Location{
    address: string;
    latitude: number;
    longitude: number;
}

export interface Path{
    departure: Location;
    destination: Location;
}


export interface Location{
    address: string;
    latitude: number;
    longitude: number;
}

export interface Route{
    departure: Location;
    destination: Location;
}

export interface Route {
    id?:number,
    departure:Location,
    destination:Location
  }


export interface Location{
    address: string;
    latitude: number;
    longitude: number;
}

export interface Path{
    departure: Location;
    destination: Location;
}

export interface Route {
    id?:number,
    departure:Location,
    destination:Location
  }


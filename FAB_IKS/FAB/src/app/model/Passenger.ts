import { Ride, RideFavorite, RideWithNoStatus } from './Ride';

export interface PassengerWithNoId {
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
  password: string;
}

export interface PassengerWithNoPassword {
  id: number;
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
}

export interface PassengerRides {
  totalCount: number;
  results: RideWithNoStatus[];
}

export interface PassengerFavorites {
  totalCount: number;
  results: RideFavorite[];
}

export interface PassengerUpdate {
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
}

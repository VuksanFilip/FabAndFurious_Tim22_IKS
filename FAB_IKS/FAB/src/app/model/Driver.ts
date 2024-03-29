
import { Document } from './Document';
import { RideWithNoStatus } from './Ride';


export interface DriverProfile{
    name: string;
    surname: string;
    telephoneNumber: string;
    email: string;
    address: string;
}

export interface DriverForUpdate{
    name: string;
    surname: string;
    profilePicture: string;
    telephoneNumber: string;
    email: string;
    address: string;
}

export interface DriverWithNoId{
    name: string;
    surname: string;
    profilePicture: string;
    telephoneNumber: string;
    email: string;
    address: string;
    password: string;

}

export interface DriverWithNoPassword {
  id: number;
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
}

export interface WorkingHour {
  id: number;
  start: string;
  end: string;
}

export interface StartingWorkingHour {
  start: Date;
}

export interface EndingWorkingHour {
  end: Date;
}

export interface DriverRides {
  totalCount: number;
  results: RideWithNoStatus[];
}

export interface ChangeRequest {
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
}

export interface ChangeDriverInfo{
  driverId: string;
  request: ChangeRequest;
}

export interface ChangeDriversInfo {
  allRequests: ChangeDriverInfo[];
}
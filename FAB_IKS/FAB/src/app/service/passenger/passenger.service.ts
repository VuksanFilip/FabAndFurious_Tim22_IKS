import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) { }

  setValue(test: any) {
    this.value$.next(test);
  }

  getAll(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(environment.apiHost);
  }

  getPassenger(passengerId: number) {
    return this.http.get<Passenger>(environment.apiHost + passengerId);
  }

  registerNewPassenger(passenger: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };

    return this.http.post<string>(
      environment.apiHost, 
      {
        name: passenger.firstName,
        surname: passenger.lastName,
        profilePicture: null,
        telephoneNumber: passenger.phone,
        email: passenger.email,
        address: passenger.address,
        password: passenger.passenger,
      },
      options
    );
  }
}

export interface Passenger {
  _id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  password: string;
}

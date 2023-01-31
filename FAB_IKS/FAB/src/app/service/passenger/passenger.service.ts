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
  
  registerNewPassenger(passenger: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };

    return this.http.post<string>(
      environment.apiHost + "api/passenger", 
      {
        name: passenger.name,
        surname: passenger.surname,
        profilePicture: passenger.profilePicture,
        telephoneNumber: passenger.telephoneNumber,
        email: passenger.email,
        address: passenger.address,
        password: passenger.password,
      },
      options
    );
  }

  getAllPassengers(): Observable<any> {
    return this.http.get<any>(environment.apiHost + "api/passenger");
  }

  getPassenger(passengerId: number) {
    return this.http.get<Passenger>(environment.apiHost + "api/passenger/" + passengerId);
  }

  activatePassenger(id: number): Observable<any> {
    return this.http.get<any>(environment.apiHost + "api/passenger/activate/" + id);
  }

  updatePassenger (id:number, passenger: any): Observable<any> {
    return this.http.put<any>(environment.apiHost + "api/passenger/" + id, passenger);
  }

  getPassengerRides(id: number) : Observable<any> {
    return this.http.get<any>(environment.apiHost + "api/passenger/" + id + "/ride");
  }

}

export interface Passenger {
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
  password: string;
}

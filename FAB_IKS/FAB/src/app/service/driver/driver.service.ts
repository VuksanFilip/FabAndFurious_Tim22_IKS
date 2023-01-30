import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) { }

  setValue(test: any) {
    this.value$.next(test);
  }

  getAll(): Observable<Driver[]> {
    return this.http.get<Driver[]>(environment.apiHost);
  }

  getDriver(driverId: number) {
    return this.http.get<Driver>(environment.apiHost + "api/driver/" + driverId);
  }

  registerNewDriver(driver: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };

    return this.http.post<string>(
      environment.apiHost + "api/driver", 
      {
        name: driver.name,
        surname: driver.surname,
        profilePicture: driver.profilePicture,
        telephoneNumber: driver.telephoneNumber,
        email: driver.email,
        address: driver.address,
        password: driver.password,
      },
      options
    );
  }
}

export interface Driver {
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
  password: string;
}





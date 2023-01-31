import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) { }

  setValue(test: any) {
    this.value$.next(test);
  }

  changeLocation(driverId: number, requestCurrentLocation: any) : Observable<any>{
    return this.http.put<any>(environment.apiHost + "api/vehicle/" + driverId + "/location", requestCurrentLocation);
  }
}

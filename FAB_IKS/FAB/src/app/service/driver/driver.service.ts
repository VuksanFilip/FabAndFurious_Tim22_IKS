import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) {}

  setValue(test: any) {
    this.value$.next(test);
  }

  createNewDriver(requestNewDriver: any): Observable<any> {
    return this.http.post<any>(
      environment.apiHost + 'api/driver',
      requestNewDriver
    );
  }

  getAllDrivers(): Observable<any> {
    return this.http.get<any>(environment.apiHost + 'api/driver');
  }

  getDriver(id: number): Observable<any> {
    return this.http.get<any>(environment.apiHost + 'api/driver/' + id);
  }

  updateDriver(id: number, requestDriverUpdate: any): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'api/driver/' + id,
      requestDriverUpdate
    );
  }

  getDriverDocuments(id: number): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/driver/' + id + '/documents'
    );
  }

  sendRequestForEdit(id: number, requestDriverUpdate: any): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'api/driver/' + id + '/request-edit',
      requestDriverUpdate
    );
  }

  getAllEditRequests(): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/driver/edit-requests'
    );
  }

  addDriverDocument(id: number, requestDocument: any): Observable<any> {
    return this.http.post<any>(
      environment.apiHost + 'api/driver/' + id + '/documents',
      requestDocument
    );
  }

  deleteDriverDocument(id: string): Observable<any> {
    return this.http.delete<any>(
      environment.apiHost + 'api/driver/document/' + id
    );
  }

  getDriverVehicle(id: number): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/driver/' + id + '/vehicle'
    );
  }

  addDriverVehicle(id: number, requestVehicle: any): Observable<any> {
    return this.http.post<any>(
      environment.apiHost + 'api/driver/' + id + '/vehicle',
      requestVehicle
    );
  }

  changeDriverVehicle(id: number, requestVehicle: any): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'api/driver/' + id + '/vehicle',
      requestVehicle
    );
  }

  getDriverWorkingHours(id: number): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/driber/' + id + '/working-hour'
    );
  }

  createDriverWorkingHour(
    id: number,
    requestWorkingHour: any
  ): Observable<any> {
    return this.http.post<any>(
      environment.apiHost + 'api/driver/' + id + '/working-hour',
      requestWorkingHour
    );
  }

  getDriverRides(id: number): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/driver/' + id + '/ride'
    );
  }

  getWorkingHour(id: number): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/driver/working-hour/' + id
    );
  }

  updateWorkingHour(id: number, requestWorkingHour: any): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'api/driver/working-hour/' + id,
      requestWorkingHour
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

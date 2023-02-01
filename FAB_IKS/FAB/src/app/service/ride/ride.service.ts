import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) {}

  setValue(test: any) {
    this.value$.next(test);
  }

  createNewRide(requestNewRide: any): Observable<any> {
    return this.http.post<any>(
      environment.apiHost + 'api/ride',
      requestNewRide
    );
  }

  getActiveRideForDriver(driverId: number): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/ride/driver/' + driverId + '/active'
    );
  }

  getActiveRideForPassenger(passengerId: number): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/ride/passenger/' + passengerId + '/active'
    );
  }

  getRide(id: number): Observable<any> {
    return this.http.get<any>(environment.apiHost + 'api/ride/' + id);
  }

  withdrawRide(id: number): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + '/api/ride/' + id + '/withdraw',
      {}
    );
  }

  setPanicReason(id: number, requestPanicReason: any): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'api/ride/' + id + '/panic',
      requestPanicReason
    );
  }

  startRide(id: number): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'api/ride/' + id + '/start',
      {}
    );
  }

  acceptRide(id: number): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'api/ride/' + id + '/accept',
      {}
    );
  }

  endRide(id: number): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'api/ride/' + id + '/end',
      {}
    );
  }

  cancelRide(id: number, requestCancelReason: any): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'api/ride/' + id + '/cancel',
      requestCancelReason
    );
  }

  createFavoriteRoute(requestNewFavRoute: any): Observable<any> {
    return this.http.post<any>(
      environment.apiHost + 'api/ride/favorites',
      requestNewFavRoute
    );
  }

  getFavoriteRoutes(id: number): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/ride/' + id + '/favorites'
    );
  }

  deleteFavoriteRoute(id: number): Observable<any> {
    return this.http.delete<any>(
      environment.apiHost + 'api/ride/favorites/' + id
    );
  }
}

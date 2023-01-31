import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) { }

  setValue(test: any) {
    this.value$.next(test);
  }

  createVehicleReview(id: number, requestReview: any) : Observable<any>{
    return this.http.post<any>(environment.apiHost + "api/review/" + id + "/vehicle", requestReview);
  }

  getVehicleReviews(id: number) : Observable<any>{
    return this.http.get<any>(environment.apiHost + "api/review/vehicle/" + id);
  }

  createDriverReview(id: number, requestReview: any) : Observable<any>{
    return this.http.post<any>(environment.apiHost + "api/review/" + id + "/driver", requestReview);
  }

  getDriverReviews(id: number) : Observable<any>{
    return this.http.get<any>(environment.apiHost + "api/review/driver/" + id);
  }

  getRideReviews(id: number) : Observable<any>{
    return this.http.get<any>(environment.apiHost + "api/review/" + id);
  }
}

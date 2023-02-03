import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) {}

  getReportDays(userId: number, dates: any): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/ride/' + userId + '/report/days',
      dates
    );
  }

  getReportKms(userId: number, dates: any): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/ride/' + userId + '/report/kms',
      dates
    );
  }
  getReportMoney(userId: number, dates: any): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/ride/' + userId + '/report/money',
      dates
    );
  }

  getAdminReportDays(dates: any): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/ride/admin-report/days',
      dates
    );
  }

  getAdminReportKms(dates: any): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/ride/admin-report/kms',
      dates
    );
  }

  getAdminReportMoney(dates: any): Observable<any> {
    return this.http.get<any>(
      environment.apiHost + 'api/ride/admin-report/money',
      dates
    );
  }
}

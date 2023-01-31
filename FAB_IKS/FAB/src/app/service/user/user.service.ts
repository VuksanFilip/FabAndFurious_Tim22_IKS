import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) { }

  setValue(test: any) {
    this.value$.next(test);
  }

  changePassword(id: number, requestNewPassword: any) : Observable<any> {
    return this.http.put<any>(environment.apiHost + "api/user/" + id + "/changePassword", requestNewPassword);
  }

  resetPassword(id: number) : Observable<any> {
    return this.http.get<any>(environment.apiHost + "api/user" + id + "/resetPassword");
  }

  changePasswordWithResetCode(id: number, requestResetPassword : any) : Observable<any>{
    return this.http.put<any>(environment.apiHost + "api/user/" + id + "/resetPassword", requestResetPassword);
  }

  getUserRides(id: number) : Observable<any> {
    return this.http.get<any>(environment.apiHost + "api/user/" + id + "/ride");
  }

  getUsers() : Observable<any> {
    return this.http.get<any>(environment.apiHost + "api/user");
  }

  blockUser(id: number) : Observable<any> {
    return this.http.put<any>(environment.apiHost + "api/user/" + id + "/block", {});
  }

  ublockUser(id: number) : Observable<any> {
    return this.http.put<any>(environment.apiHost + "api/user/" + id + "/unblock", {});
  }

  getUserMessages(id: number) : Observable<any> {
    return this.http.get<any>(environment.apiHost + "api/user/" + id + "/message");
  }

  sendMessageToUser(id: number) : Observable<any> {
    return this.http.post<any>(environment.apiHost + "api/user/" + id + "/message", {});
  }

  createNote(id: number, requestNote: any) : Observable<any> {
    return this.http.post<any>(environment.apiHost + "api/user/" + id + "/note", requestNote);
  }

  getUserNotes(id: number) : Observable<any> {
    return this.http.get(environment.apiHost + "api/user/" + id + "/note");
  }
}

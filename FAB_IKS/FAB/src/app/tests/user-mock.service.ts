import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../auth/model/login';
import { Token } from '../auth/model/token';

export interface Error {
  status?: number;
}

@Injectable({
  providedIn: 'root', //obrisano
})
export class UserMockService {
  public login(auth: Login): Observable<Token> {
    const token: Token = {
      accessToken: 'abc',
      refreshToken: 'abc',
    };
    return new BehaviorSubject(token).asObservable();
  }

  public isLoggedIn(): boolean {
    return false;
  }

  // public getUserIdByMail(email: string): Observable<UserRetrieved> {
  //   const error: Error = { status: 404 };
  //   throw error;
  // } ?

  public getRole(): string {
    return 'PASSENGER';
  }
}

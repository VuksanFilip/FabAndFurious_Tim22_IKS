import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  getDecodeAccessToken(): any {
    try{
      return jwt_decode(localStorage.getItem('user')!);
    } catch (Error){
      return null;
    }
  }

  constructor() { }
}

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { WorkingHour } from '../model/Driver';

export interface ComplexError {
  error: {
    message : string
  }
}
@Injectable({
  providedIn: 'root'
})
export class DriverMockService {
  public startShift(): Observable<WorkingHour> {
    const err : ComplexError = { error: {message:"limit"}};//promeniti
    return throwError(err);
  }
}

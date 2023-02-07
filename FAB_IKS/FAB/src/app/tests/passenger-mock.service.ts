import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserWithNoPassword } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class PassengerMockService {
  registerPassenger(newData : UserWithNoPassword) : Observable<UserWithNoPassword> {
    const user : UserWithNoPassword = {
      id: 1,
      name: newData["name"],
      surname: newData["surname"],
      profilePicture: newData["profilePicture"] === null ? "" : newData["profilePicture"],
      telephoneNumber: newData["telephoneNumber"],
      email: newData["email"],
      address: newData["address"]
    }//izmeniti
    return new BehaviorSubject(user).asObservable();
  }
}

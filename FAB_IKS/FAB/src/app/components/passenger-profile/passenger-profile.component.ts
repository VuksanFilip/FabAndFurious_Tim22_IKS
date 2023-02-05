import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth/token/token.service';
import {
  Passenger,
  PassengerService,
} from 'src/app/service/passenger/passenger.service';

@Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.css'],
})
export class PassengerProfileComponent implements OnInit {
  passenger: Passenger = {
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    email: '',
    address: '',
    password: '',
  };

  constructor(private passengerService: PassengerService, private tokenDecoder: TokenService) {}

  ngOnInit(): void {
    const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
    this.passengerService
      .getPassenger(tokenInfo.id)
      .subscribe((passenger2) => (this.passenger = passenger2));
  }
}

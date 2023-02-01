import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PassengerUpdate } from 'src/app/model/Passenger';
import { Passenger, PassengerService } from 'src/app/service/passenger/passenger.service';

@Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.css']
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
  }

  constructor(private passengerService: PassengerService) { }

  ngOnInit(): void {
    this.passengerService.getPassenger(2).subscribe((passenger2) => (this.passenger = passenger2));
  }


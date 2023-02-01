import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DriverForUpdate } from 'src/app/model/Driver';
import { PassengerUpdate } from 'src/app/model/Passenger';
import { Passenger, PassengerService } from 'src/app/service/passenger/passenger.service';

@Component({
  selector: 'app-passenger-profile-edit',
  templateUrl: './passenger-profile-edit.component.html',
  styleUrls: ['./passenger-profile-edit.component.css']
})
export class PassengerProfileEditComponent{
  passengerForm = new FormGroup(
    {
      name: new FormControl(''),
      surname: new FormControl(''),
      telephoneNumber: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl('', [Validators.email]),
    }
  )

  constructor(private passengerService: PassengerService) { }


  update() {
    const passenger: PassengerUpdate = {
      name: this.passengerForm.value.name!,
      surname: this.passengerForm.value.surname!,
      profilePicture: 'slika',
      telephoneNumber: this.passengerForm.value.telephoneNumber!,
      email: this.passengerForm.value.email!,
      address: this.passengerForm.value.address!,
    }
    this.passengerService.updatePassenger(2, passenger).subscribe((res) => {
      console.log(res);
    });
  }

}

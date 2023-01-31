import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Passenger, PassengerService } from 'src/app/service/passenger/passenger.service';

@Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.css']
})
export class PassengerProfileComponent implements OnInit {
  updateForm = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      telephoneNumber: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
  }
  )

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

  update() : void {
    if(this.updateForm.valid){
      alert("USPEH");
      const passenger: Passenger = {
        name: this.updateForm.value.name!,
        surname: this.updateForm.value.surname!,
        profilePicture: 'slika',
        telephoneNumber: this.updateForm.value.telephoneNumber!,
        address: this.updateForm.value.address!,
        email: this.updateForm.value.email!,
        password: 'sifra',
      };
      this.passengerService.updatePassenger(2, passenger).subscribe((res: any) => {
        console.log(res);
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger, PassengerService } from 'src/app/service/passenger/passenger.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent{
  constructor(private passengerService: PassengerService, private router: Router) {}

  registrationForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      telephoneNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmePassword: new FormControl('', [Validators.required]),
    }
  );

  register() : void {
    console.log(this.registrationForm);
    if(this.registrationForm.valid){
      alert("Uspeh!!!!!");
      const passenger: Passenger = {
        name: this.registrationForm.value.name!,
        surname: this.registrationForm.value.surname!,
        profilePicture: 'slika',
        telephoneNumber: this.registrationForm.value.telephoneNumber!,
        address: this.registrationForm.value.address!,
        email: this.registrationForm.value.email!,
        password: this.registrationForm.value.password!
      };
      this.passengerService.registerNewPassenger(passenger).subscribe((res: any) => {
        console.log(res);
      })
    }
  }

  get f() {
    return this.registrationForm.controls;
  }

  mustMatch(password: any, confirmePassword: any) {
    return (formGroup: FormGroup) => {
      const passwordcontrol = formGroup.controls[password];
      const confirmepasswordcontrol = formGroup.controls[confirmePassword];
      if (
        confirmepasswordcontrol.errors &&
        !confirmepasswordcontrol.errors['mustMatch']
      ) {
        return;
      }
      if (passwordcontrol.value !== confirmepasswordcontrol.value) {
        confirmepasswordcontrol.setErrors({ mustMatch: true });
      } else {
        confirmepasswordcontrol.setErrors(null);
      }
    };
  }
}

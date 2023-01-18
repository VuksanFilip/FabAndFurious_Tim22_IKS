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
export class RegistrationComponent implements OnInit {
  passenger: Passenger = {
    _id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  }

  registration!: FormGroup;
  title = 'angularvalidate';
  submitted = false;

  constructor(private formBuilder: FormBuilder, private passengerService: PassengerService, private router: Router) {}

  ngOnInit() {
    this.registration = this.formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmePassword: new FormControl('', [Validators.required]),
      },
      {
        validators: this.mustMatch('password', 'confirmePassword'),
      }
    );
  }

  // onSubmit() {
  //   this.submitted = true;

  //   if (this.registration.invalid) {
  //     return;
  //   }
  //   alert('Success');
  // }

  register() {
    this.passengerService.registerNewPassenger(this.passenger).subscribe((res: any) => {
      console.log(res);
    })
  }

  get f() {
    return this.registration.controls;
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

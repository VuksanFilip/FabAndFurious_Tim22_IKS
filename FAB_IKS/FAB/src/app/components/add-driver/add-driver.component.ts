import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
})
export class AddDriverComponent implements OnInit {
  addDriver!: FormGroup;
  title = 'angularvalidate';
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addDriver = this.formBuilder.group(
      {
        firstName: new FormControl('', Validators.required),
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        cartype: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required, Validators.minLength(8)],
        confirmePassword: ['', Validators.required],
      },
      {
        validators: this.mustMatch('password', 'confirmePassword'),
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.addDriver.invalid) {
      return;
    }
    alert('Success');
  }

  get f() {
    return this.addDriver.controls;
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

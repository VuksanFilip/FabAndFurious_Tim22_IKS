import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  title = 'angularvalidate';
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.login = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.login.invalid) {
      return;
    }
    alert('Success');
  }

  get f() {
    return this.login.controls;
  }
}

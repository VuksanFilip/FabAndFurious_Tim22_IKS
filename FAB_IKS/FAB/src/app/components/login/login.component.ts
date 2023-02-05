import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';
// import { Token } from 'src/app/auth/model/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  title = 'angularvalidate';
  submitted = false;
  hasError: boolean = false;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  login(){
    const loginVal = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if (this.loginForm.valid) {
      this.authService.login(loginVal).subscribe({
        next: (result : any) => {
          alert("Successful login!");
          localStorage.setItem('user', JSON.stringify(result["accessToken"]));
          localStorage.setItem('refreshToken', JSON.stringify(result["refreshToken"]));
          this.authService.setUser();
          // this.router.navigate(['/']); //gde se rutira?
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.hasError = true;
          }
        },
      });
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}

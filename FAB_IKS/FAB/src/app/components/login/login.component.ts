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
import { Error } from 'src/app/model/Error';
import { TokenService } from 'src/app/auth/token/token.service';

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

  error: Error = {
    message: '',
  }

  constructor(private authService: AuthService, private router: Router, private tokenDecoder: TokenService) {}

  login(){
    const loginVal = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if (this.loginForm.valid) {
      this.authService.login(loginVal).subscribe({
        next: (result : any) => {
          alert("Successfull login!");
          localStorage.setItem('user', JSON.stringify(result["accessToken"]));
          localStorage.setItem('refreshToken', JSON.stringify(result["refreshToken"]));
          this.authService.setUser();
          const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
          if(tokenInfo.role == 'ADMIN'){
            this.router.navigate(['map-admin']);
          } else if(tokenInfo.role == 'DRIVER'){
            this.router.navigate(['current-drive-driver']);
          } else {
            this.router.navigate(['map']);
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            alert("Wrong username or password!");
          }
        },
      });
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}

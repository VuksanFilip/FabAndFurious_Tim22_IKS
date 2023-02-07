import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Login } from './model/login';
import { Token } from './model/token';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return token', () => {
    const loginCredentials: Login = {
      email: 'marko.markovic@gmail.com', 
      password: 'marko123',
    };
    const token: Token = {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',//promeniti
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    };
    service.login(loginCredentials).subscribe(
      result =>{
        console.log(result);
        // expect(result['access_token']).toEqual(token['accessToken']);
        // expect(result['refresh_token']).toEqual(token['accessToken']);
      }
    );

    const req = httpController.expectOne({
      url: 'http://localhost:8084/api/user/login', 
    });
    expect(req.request.method).toEqual('POST');
    req.flush(token);
  });

  it('should return false if user is not logged in', () => {
    localStorage.removeItem('user');
    expect(service.isLoggedIn()).toBeFalsy();
  });


  
});

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Login } from './model/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from './model/token';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, JwtHelperService],
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
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8',
    };
    service.login(loginCredentials).subscribe((result) => {
      // expect(result.accessToken).toEqual(
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8'
      // );
      // expect(result.refreshToken).toEqual(
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8'
      // );
    });

    const req = httpController.expectOne({
      url: 'http://localhost:8084/api/user/login',
    });
    expect(req.request.method).toEqual('POST');
    req.flush(token);
  });

  it('should return null if there is no logged in user', () => {
    localStorage.removeItem('user');
    expect(service.getRole()).toBeNull();
  });

  it('should return the role of the logged in user', () => {
    localStorage.setItem(
      'user',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8'
    );
    const role = 'DRIVER';
    const helper = new JwtHelperService();
    spyOn(helper, 'decodeToken').and.returnValue({
      role: [{ authority: role }],
    });
    expect(service.getRole()).toEqual(role);
  });

  it('should return true if user is logged in', () => {
    localStorage.setItem(
      'user',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XX0.ScQ_gN-hbxll68NU0pZPIFN-8zvgWzBvwjKlhRlYAK8'
    );
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should return false if user is not logged in', () => {
    localStorage.removeItem('user');
    expect(service.isLoggedIn()).toBeFalsy();
  });
});

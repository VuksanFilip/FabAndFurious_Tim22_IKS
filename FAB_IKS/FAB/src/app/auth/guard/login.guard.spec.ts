import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { WorkingHour } from 'src/app/model/Driver';
import { UserWithNoPassword } from 'src/app/model/User';
import { DriverService } from 'src/app/service/driver/driver.service';
import { UserService } from 'src/app/service/user/user.service';
import { DriverMockService } from 'src/app/tests/driver-mock.service';
import { UserMockService } from 'src/app/tests/user-mock.service';
import { AuthService } from '../auth.service';

import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let authService: AuthService;
  let router : Router;
  let driverService : DriverService;


  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        {provide: UserService, useClass: UserMockService},
        {provide : DriverService, useClass: DriverMockService},
      ],});
    guard = TestBed.inject(LoginGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    driverService = TestBed.inject(DriverService);
    
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});

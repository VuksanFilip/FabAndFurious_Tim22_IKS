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

//ne u ovom fajlu nego bas login.service?
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

  it('Should return false if user is not logged in', () => {
    //const returnVal = guard.canActivate(); //argumenti
    //expect(returnVal).toBeFalsy();
  });

  it('Should return false if user email is null', () => { //user_email?
    spyOn(sessionStorage,'getItem').withArgs('user_email').and.returnValue(null);
    //const returnVal = guard.canActivate();
    //expect(returnVal).toBeFalsy();
  });

  it('Should catch error if user email does not exist', () => {
    //const returnVal = guard.canActivate();
    spyOn(router,'navigate');
    //expect(returnVal).toBeFalsy();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  //promeniti da bude kao za admina
  it('Should route to passenger home if credentials are correct', () => {
    spyOn(authService,'isLoggedIn').and.returnValue(true);
    spyOn(sessionStorage,'getItem').withArgs('user_email').and.returnValue('mail@mail.com');
    const user : UserWithNoPassword = {
      id : 1,
      name : '',
      surname : '',
      profilePicture : '',
      telephoneNumber : '',
      email : 'mail@mail.com',
      address : ''
    }
    spyOn(authService,'getUserIdByMail').withArgs('mail@mail.com').and.returnValue(new BehaviorSubject(user).asObservable());
    const routerSpy = spyOn(router,'navigate').and.stub();
    //guard.canActivate();
    expect(router.navigate).toHaveBeenCalled();
    expect(routerSpy.calls.first().args[0]).toContain('passenger-home');
  });

  it('Should route to admin home if credentials are correct', () => {
    spyOn(authService,'isLoggedIn').and.returnValue(true);
    spyOn(authService,'getRole').and.returnValue("ADMIN");
    spyOn(sessionStorage,'getItem').withArgs('user_email').and.returnValue('mail@mail.com');
    const user : UserWithNoPassword = {
      id : 1,
      name : '',
      surname : '',
      profilePicture : '',
      telephoneNumber : '',
      email : 'mail@mail.com',
      address : ''
    }
    spyOn(authService,'getUserIdByMail').withArgs('mail@mail.com').and.returnValue(new BehaviorSubject(user).asObservable());
    const routerSpy = spyOn(router,'navigate').and.stub();
    //guard.canActivate();
    expect(router.navigate).toHaveBeenCalled();
    expect(routerSpy.calls.first().args[0]).toContain('admin-home'); //promeniti
  });

  // it('Should not route to driver home if his working hours are maxed out', () => {
  //   spyOn(authService,'isLoggedIn').and.returnValue(true);
  //   spyOn(authService,'getRole').and.returnValue("ROLE_DRIVER");
  //   spyOn(sessionStorage,'getItem').withArgs('user_email').and.returnValue('mail@mail.com');
  //   const user : UserWithNoPassword = {
  //     id : 1,
  //     name : '',
  //     surname : '',
  //     profilePicture : '',
  //     telephoneNumber : '',
  //     email : 'mail@mail.com',
  //     address : ''
  //   }
  //   spyOn(userService,'getUserIdByMail').withArgs('mail@mail.com').and.returnValue(new BehaviorSubject(user).asObservable());
  //   spyOn(notificationService,'createNotification')
  //   spyOn(router,'navigate').and.stub();
  //   const returnVal = guard.canActivate();
  //   expect(returnVal).toBeFalsy();
  //   expect(router.navigate).not.toHaveBeenCalled();
  //   expect(notificationService.createNotification).toHaveBeenCalled();
  // });


  it('Should route to driver home if his credentials and working hours are in order ', () => {
    spyOn(authService,'isLoggedIn').and.returnValue(true);
    spyOn(authService,'getRole').and.returnValue("DRIVER");
    spyOn(sessionStorage,'getItem').withArgs('user_email').and.returnValue('mail@mail.com');
    const user : UserWithNoPassword = {
      id : 1,
      name : '',
      surname : '',
      profilePicture : '',
      telephoneNumber : '',
      email : 'mail@mail.com',
      address : ''
    }
    const validShift: WorkingHour = { //skloniti?
      id: 1,
      start: '',
      end: ''
    }

    spyOn(authService,'getUserIdByMail').withArgs('mail@mail.com').and.returnValue(new BehaviorSubject(user).asObservable());
    spyOn(driverService,'getDriverWorkingHours').and.returnValue(new BehaviorSubject(validShift).asObservable());
    const routerSpy = spyOn(router,'navigate').and.stub();
    //guard.canActivate();
    expect(router.navigate).toHaveBeenCalled();
    expect(routerSpy.calls.first().args[0]).toContain('driver-home'); //promeniti
  });

});

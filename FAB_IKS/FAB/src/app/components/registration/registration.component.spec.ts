import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import {MatIconModule} from "@angular/material/icon";
import {BrowserModule, By} from "@angular/platform-browser";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DebugElement} from "@angular/core";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import { UserService } from 'src/app/service/user/user.service';
import { PassengerService } from 'src/app/service/passenger/passenger.service';
import { UserMockService } from 'src/app/tests/user-mock.service';
import { PassengerMockService } from 'src/app/tests/passenger-mock.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let registerForm: HTMLElement;
  let passengerService: PassengerService;
  let registerBtn: any;
  let nextButton: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      providers: [
        {provide: UserService, useClass: UserMockService},
        {provide: PassengerService, useClass: PassengerMockService}
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    passengerService = TestBed.inject(PassengerService);
    component = fixture.componentInstance;
    registerBtn = fixture.debugElement.query(By.css("#registrationButton")).nativeElement;
    registerForm = fixture.debugElement.nativeElement.querySelectorAll("form")[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create registration form', () => {
    expect(registerForm).toBeDefined();
  });

  it("Should not call register passenger in passenger service if fields are empty", async () => {
    component.registrationForm.controls["name"].setValue('');
    component.registrationForm.controls["surname"].setValue('');
    component.registrationForm.controls["telephoneNumber"].setValue('');
    component.registrationForm.controls["address"].setValue('');
   // registerBtn.click();?
   // fixture.detectChanges();?
    component.registrationForm.controls["email"].setValue('');
    component.registrationForm.controls["password"].setValue('');
    component.registrationForm.controls["confirmePassword"].setValue('');
    registerBtn.click();
    fixture.whenStable().then(() => {
      expect(component.register).toHaveBeenCalled();
      spyOn(passengerService, 'registerNewPassenger').and.callThrough();
      expect(passengerService.registerNewPassenger).not.toHaveBeenCalled();
    });
  });

  it("Should not call register passenger in passenger service if email field format is not correct", async () => {
    component.registrationForm.controls["name"].setValue('Test');
    component.registrationForm.controls["surname"].setValue('Test');
    component.registrationForm.controls["telephoneNumber"].setValue('Test');
    component.registrationForm.controls["address"].setValue('Test');
    nextButton.click();
    fixture.detectChanges();
    component.registrationForm.controls["email"].setValue('Test');
    component.registrationForm.controls["password"].setValue('Test');
    component.registrationForm.controls["confirmePassword"].setValue('Test');
    registerBtn.click();
    fixture.whenStable().then(() => {
      expect(component.register).toHaveBeenCalled();
      spyOn(passengerService, 'registerNewPassenger').and.callThrough();
      expect(passengerService.registerNewPassenger).not.toHaveBeenCalled();
    });
  });

  it("Should not call register passenger in passenger service if password and password repeat fields are not the same", async () => {
    component.registrationForm.controls["name"].setValue('ime');
    component.registrationForm.controls["surname"].setValue('prezime');
    component.registrationForm.controls["telephoneNumber"].setValue('1234567890');
    component.registrationForm.controls["address"].setValue('adresa');
   component.registrationForm.controls["email"].setValue('asd@gmail.com');
    component.registrationForm.controls["password"].setValue('sifra');
    component.registrationForm.controls["confirmePassword"].setValue('sifra1');
    registerBtn.click();
    fixture.whenStable().then(() => {
        expect(component.register).toHaveBeenCalled();
        spyOn(passengerService, 'registerNewPassenger').and.callThrough();
        expect(passengerService.registerNewPassenger).not.toHaveBeenCalled();
      }
    );
  });

  it("Should call register passenger in passenger service if the data is valid", async () => {
    component.registrationForm.controls["name"].setValue('Ime');
    component.registrationForm.controls["surname"].setValue('Prezime');
    component.registrationForm.controls["telephoneNumber"].setValue('38162983143');
    component.registrationForm.controls["address"].setValue('adresa');
    nextButton.click();
    fixture.detectChanges();
    component.registrationForm.controls["email"].setValue('lol@gmail.com');
    component.registrationForm.controls["password"].setValue('sifra');
    component.registrationForm.controls["confirmePassword"].setValue('sifra');
    spyOn(passengerService,'registerNewPassenger').and.callThrough();
    registerBtn.click();
    expect(component.register).toHaveBeenCalled();
    expect(passengerService.registerNewPassenger).toHaveBeenCalled();
  });
});

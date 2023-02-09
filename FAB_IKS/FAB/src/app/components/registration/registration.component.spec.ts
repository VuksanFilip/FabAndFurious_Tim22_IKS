import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule, By } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/service/user/user.service';
import { PassengerService } from 'src/app/service/passenger/passenger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let registerForm: HTMLElement;
  let passengerService: PassengerService;
  let registerBtn: any;
  let nextButton: any;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      providers: [PassengerService, UserService],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    passengerService = TestBed.get(PassengerService);
    userService = TestBed.get(UserService);
    registerBtn = fixture.debugElement.query(
      By.css('#registrationButton')
    ).nativeElement;
    registerForm =
      fixture.debugElement.nativeElement.querySelectorAll('form')[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create registration form', () => {
    expect(registerForm).toBeDefined();
  });

  it('Should not call register passenger in passenger service if fields are empty', () => {
    component.registrationForm.controls['name'].setValue('');
    component.registrationForm.controls['surname'].setValue('');
    component.registrationForm.controls['telephoneNumber'].setValue('');
    component.registrationForm.controls['address'].setValue('');
    component.registrationForm.controls['email'].setValue('');
    component.registrationForm.controls['password'].setValue('');
    component.registrationForm.controls['confirmePassword'].setValue('');
    registerBtn.click();
    fixture.whenStable().then(() => {
      expect(component.register).toHaveBeenCalled();
      spyOn(passengerService, 'registerNewPassenger').and.callThrough();
      expect(passengerService.registerNewPassenger).not.toHaveBeenCalled();
    });
  });

  it('Should not call register passenger in passenger service if email field format is not correct', async () => {
    component.registrationForm.controls['name'].setValue('ime');
    component.registrationForm.controls['surname'].setValue('prezime');
    component.registrationForm.controls['telephoneNumber'].setValue(
      '1234567890'
    );
    component.registrationForm.controls['address'].setValue('adresa');
    registerBtn.click();
    fixture.detectChanges();
    component.registrationForm.controls['email'].setValue('asd');
    component.registrationForm.controls['password'].setValue('sifra');
    component.registrationForm.controls['confirmePassword'].setValue('sifra1');
    registerBtn.click();
    fixture.whenStable().then(() => {
      expect(component.register).toHaveBeenCalled();
      spyOn(passengerService, 'registerNewPassenger').and.callThrough();
      expect(passengerService.registerNewPassenger).not.toHaveBeenCalled();
    });
  });

  it('Should not call register passenger in passenger service if password and password repeat fields are not the same', async () => {
    component.registrationForm.controls['name'].setValue('ime');
    component.registrationForm.controls['surname'].setValue('prezime');
    component.registrationForm.controls['telephoneNumber'].setValue(
      '1234567890'
    );
    component.registrationForm.controls['address'].setValue('adresa');
    component.registrationForm.controls['email'].setValue('asd@gmail.com');
    component.registrationForm.controls['password'].setValue('sifra');
    component.registrationForm.controls['confirmePassword'].setValue('sifra1');
    registerBtn.click();
    fixture.whenStable().then(() => {
      expect(component.register).toHaveBeenCalled();
      spyOn(passengerService, 'registerNewPassenger').and.callThrough();
      expect(passengerService.registerNewPassenger).not.toHaveBeenCalled();
    });
  });

  it('Should call register passenger in passenger service if the data is valid', async () => {
    component.registrationForm.controls['name'].setValue('Ime');
    component.registrationForm.controls['surname'].setValue('Prezime');
    component.registrationForm.controls['telephoneNumber'].setValue(
      '38162983143'
    );
    component.registrationForm.controls['address'].setValue('adresa');
    nextButton.click();
    fixture.detectChanges();
    component.registrationForm.controls['email'].setValue('lol@gmail.com');
    component.registrationForm.controls['password'].setValue('sifra');
    component.registrationForm.controls['confirmePassword'].setValue('sifra');
    spyOn(passengerService, 'registerNewPassenger').and.callThrough();
    registerBtn.click();
    expect(component.register).toHaveBeenCalled();
    expect(passengerService.registerNewPassenger).toHaveBeenCalled();
  });
});

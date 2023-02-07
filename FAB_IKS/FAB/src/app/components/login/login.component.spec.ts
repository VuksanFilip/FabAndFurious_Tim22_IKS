import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMockService } from 'src/app/tests/user-mock.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginForm: HTMLElement;
  let submitBtn: HTMLElement;
  let authService: AuthService; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useClass: UserMockService }],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
    submitBtn = fixture.debugElement.query(
      By.css('#loginButton')
    ).nativeElement;
    spyOn(component, 'login').and.callThrough();
    loginForm = fixture.debugElement.nativeElement.querySelectorAll('form')[0]; //?
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create login form', () => {
    expect(loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('Should not call login in user service if fields are empty', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Should not call login in user service if email field format is not correct', () => {
    component.loginForm.controls['email'].setValue('marko.markovic');
    component.loginForm.controls['password'].setValue('marko123');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be invalid password length', () =>{
    component.loginForm.controls['email'].setValue('marko.markovic@gmail.com');
    component.loginForm.controls['password'].setValue('123');
    expect(component.loginForm.valid).toBeFalsy();

  });

  it('form should be valid', () =>{
    component.loginForm.controls['email'].setValue('marko.markovic@gmail.com');
    component.loginForm.controls['password'].setValue('marko123');
    expect(component.loginForm.valid).toBeTruthy();

  });

  it('should call the login method', () =>{
    spyOn(component, 'login');
    submitBtn = fixture.debugElement.query(By.css('#loginButton')).nativeElement;
    submitBtn.click();
    expect(component.login).toHaveBeenCalledTimes(1);
    
  });

  it('should set has error to false', () =>{ //nkntm
    spyOn(component, 'login');
    component.loginForm.controls['email'].setValue('nikolaj@gmail.com');
    component.loginForm.controls['password'].setValue('Nikolaj123');
    submitBtn = fixture.debugElement.query(By.css('#loginButton')).nativeElement;
    submitBtn.click();
    expect(component.hasError).toBeFalsy();
  });

});

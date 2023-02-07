import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/service/user/user.service';
import { UserMockService } from 'src/app/tests/user-mock.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { Login } from 'src/app/auth/model/login';
import { Token } from 'src/app/auth/model/token';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginForm: HTMLElement;
  let submitBtn: any;
  // let userService: UserService;
  let authService: AuthService; //proveriti

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
  });

  it('Should not call login in user service if fields are empty', async () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    submitBtn.click();
    fixture.whenStable().then(() => {
      expect(component.login).toHaveBeenCalled();
      spyOn(authService, 'login').and.callThrough(); //proveriti
      expect(authService.login).not.toHaveBeenCalled();
    });
  });

  it('Should not call login in user service if email field format is not correct', async () => {
    component.loginForm.controls['email'].setValue('invalid.mail@gmail.com');
    component.loginForm.controls['password'].setValue(':(');
    submitBtn.click();
    fixture.whenStable().then(() => {
      expect(component.login).toHaveBeenCalled();
      spyOn(authService, 'login').and.callThrough(); //proveriti
      expect(authService.login).not.toHaveBeenCalled();
    });
  });

  it('Should redirect to login path if both fields are valid', (done) => {
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate').and.stub();
    component.loginForm.controls['email'].setValue('pera.peric@gmail.com'); //promeniti
    component.loginForm.controls['password'].setValue('pera123'); //promeniti
    const credentials: Login = {
      email: <string>component.loginForm.controls['email'].value,
      password: <string>component.loginForm.controls['password'].value,
    };
    const token: Token = {
      accessToken: 'sss',
      refreshToken: 'ddd', //promeniti vrednosti mozda
    };
    const returnVal = new BehaviorSubject(token).asObservable();
    // spyOn(authService, 'login')
    //   .withArgs(credentials)
    //   .and.returnValue(returnVal); //ne radi
    submitBtn.click();
    fixture.whenStable().then(() => {
      expect(component.login).toHaveBeenCalled();
      expect(authService.login).toHaveBeenCalled();
      expect(routerSpy.calls.first().args[0]).toContain('login'); //?
      done();
    });
  });
});

import { UserService } from './../../service/user/user.service';
import { NewOldPassword } from './../../model/User';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth/token/token.service';
import {
  Passenger,
  PassengerService,
} from 'src/app/service/passenger/passenger.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-passenger-profile',
  templateUrl: './passenger-profile.component.html',
  styleUrls: ['./passenger-profile.component.css'],
})
export class PassengerProfileComponent implements OnInit {
  passenger: Passenger = {
    name: '',
    surname: '',
    profilePicture: '',
    telephoneNumber: '',
    email: '',
    address: '',
    password: '',
  };

  changepassword: NewOldPassword = {
    newPassword: '123',
    oldPassword: '',
  };

  constructor(
    private passengerService: PassengerService,
    private tokenDecoder: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
    this.passengerService
      .getPassenger(tokenInfo.id)
      .subscribe((passenger2) => (this.passenger = passenger2));
  }

  changePasswordForm = new FormGroup({
    old: new FormControl('', Validators.required),
    new: new FormControl('', Validators.required),
  });

  changePassword() {
    const newOldPassword: NewOldPassword = {
      oldPassword: this.changePasswordForm.value.old!,
      newPassword: this.changePasswordForm.value.new!,
    };
    //console.log(newOldPassword);
    var btn = document.getElementById('change');
    const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
    if (this.changePasswordForm.valid) {
      this.userService
        .changePassword(tokenInfo.id, newOldPassword)
        .subscribe((changepassword2) => {
          this.changepassword = changepassword2;
          btn!.innerText = 'Password changed';
          console.log(this.changepassword);
        });
    } else {
      alert('Empty input field');
      btn!.innerText = 'Change password';
    }
    const form = document.getElementById('form');
    form!.style.display = 'none';
  }

  show(): void {
    const form = document.getElementById('form');
    if (form != null) {
      var btn = document.getElementById('change');
      if (form.style.display === 'none') {
        form.style.display = 'block';
        btn!.innerText = 'Change password';
      } else {
        form.style.display = 'none';
        btn!.innerText = 'Change password';
      }
    }
  }
}

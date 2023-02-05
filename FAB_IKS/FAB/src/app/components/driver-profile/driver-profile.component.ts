import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/service/driver/driver.service';
import { DriverProfile } from 'src/app/model/Driver';
import { VehicleDriverProfile } from 'src/app/model/Vehicle';
import { Location } from 'src/app/model/Location';
import { TokenService } from 'src/app/auth/token/token.service';
import { UserService } from 'src/app/service/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewOldPassword } from 'src/app/model/User';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css'],
})
export class DriverProfileComponent implements OnInit {
  driver: DriverProfile = {
    name: '',
    surname: '',
    telephoneNumber: '',
    email: '',
    address: '',
  };

  changepassword: NewOldPassword = {
    newPassword: '123',
    oldPassword: '',
  };

  location: Location = {
    address: '',
    latitude: 0,
    longitude: 0,
  };

  vehicle: VehicleDriverProfile = {
    id: 0,
    driverId: 0,
    vehicleType: '',
    model: '',
    licenseNumber: '',
    currentLocation: this.location,
    passengerSeats: 0,
    babyTransport: false,
    petTransport: false,
  };

  constructor(
    private driverService: DriverService,
    private tokenDecoder: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
    this.driverService
      .getDriver(tokenInfo.id)
      .subscribe((driverProfile) => (this.driver = driverProfile));
    console.log(tokenInfo.role);

    // this.driverService.getDriverVehicle(5).subscribe((vehicleProfile) => (this.vehicle = vehicleProfile));
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

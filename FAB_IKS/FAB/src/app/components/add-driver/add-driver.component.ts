import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/model/Location';
import {
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { DriverWithNoId } from 'src/app/model/Driver';
import { RequestDriverVehicle } from 'src/app/model/Vehicle';
import { DriverService } from 'src/app/service/driver/driver.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
})
export class AddDriverComponent {
  title = 'angularvalidate';
  submitted = false;

  addDriver = new FormGroup(
    {
      name: new FormControl(''),
      surname: new FormControl(''),
      telephoneNumber: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      password: new FormControl(''),
    }
  )
  vehicleForm = new FormGroup(
    {
      model: new FormControl(''),
      type: new FormControl(''),
      licenseNumber: new FormControl(''),
      seats: new FormControl(0),
      babies: new FormControl(false),
      pets: new FormControl(false),
    }
  )

  constructor(private driverService: DriverService) { }


  addNewDriver() {
    const driver: DriverWithNoId = {
      name: this.addDriver.value.name!,
      surname: this.addDriver.value.surname!,
      profilePicture: 'slika',
      telephoneNumber: this.addDriver.value.telephoneNumber!,
      email: this.addDriver.value.email!,
      address: this.addDriver.value.address!,
      password: this.addDriver.value.password!,
    }
    this.driverService.createNewDriver(driver).subscribe((res) => {
      console.log(res);
    });
  }

  addVehicle() {
    const location: Location = {
      address: '',
      latitude: 0,
      longitude: 0,
    }
    const vehicle: RequestDriverVehicle = {
      vehicleType: this.vehicleForm.value.type!,
      model: this.vehicleForm.value.model!,
      licenseNumber: this.vehicleForm.value.licenseNumber!,
      currentLocation: location,
      passengerSeats: this.vehicleForm.value.seats!,
      babyTransport: this.vehicleForm.value.babies!,
      petTransport: this.vehicleForm.value.pets!
    }
    this.driverService.addDriverVehicle(5, vehicle).subscribe((res) => {
      console.log(res);
    })
  }
  get f() {
    return this.addDriver.controls;
  }

  mustMatch(password: any, confirmePassword: any) {
    return (formGroup: FormGroup) => {
      const passwordcontrol = formGroup.controls[password];
      const confirmepasswordcontrol = formGroup.controls[confirmePassword];
      if (
        confirmepasswordcontrol.errors &&
        !confirmepasswordcontrol.errors['mustMatch']
      ) {
        return;
      }
      if (passwordcontrol.value !== confirmepasswordcontrol.value) {
        confirmepasswordcontrol.setErrors({ mustMatch: true });
      } else {
        confirmepasswordcontrol.setErrors(null);
      }
    };
  }
}

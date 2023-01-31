import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DriverService } from 'src/app/service/driver/driver.service';
import { VehicleService } from 'src/app/service/vehicle/vehicle.service';
import { DriverForUpdate } from 'src/app/model/Driver';
import { RequestDriverVehicle } from 'src/app/model/Vehicle';
import { Location } from 'src/app/model/Location';

@Component({
  selector: 'app-driver-profile-edit',
  templateUrl: './driver-profile-edit.component.html',
  styleUrls: ['./driver-profile-edit.component.css']
})
export class DriverProfileEditComponent {
  driverForm = new FormGroup(
    {
      name: new FormControl(''),
      surname: new FormControl(''),
      telephoneNumber: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl('', [Validators.email]),
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

  constructor(private driverService: DriverService, private vehicleService: VehicleService) { }


  updateDriver() {
    const driver: DriverForUpdate = {
      name: this.driverForm.value.name!,
      surname: this.driverForm.value.surname!,
      profilePicture: 'slika',
      telephoneNumber: this.driverForm.value.telephoneNumber!,
      email: this.driverForm.value.email!,
      address: this.driverForm.value.address!,
    }
    this.driverService.updateDriver(5, driver).subscribe((res) => {
      console.log(res);
    });
  }

  changeVehicle() {
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
    this.driverService.changeDriverVehicle(5, vehicle).subscribe((res) => {
      console.log(res);
    })
  }

}

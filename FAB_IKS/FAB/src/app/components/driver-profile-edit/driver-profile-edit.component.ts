import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DriverService } from 'src/app/service/driver/driver.service';
import { VehicleService } from 'src/app/service/vehicle/vehicle.service'
import { DriverForUpdate } from 'src/app/model/Driver';

@Component({
  selector: 'app-driver-profile-edit',
  templateUrl: './driver-profile-edit.component.html',
  styleUrls: ['./driver-profile-edit.component.css']
})
export class DriverProfileEditComponent {
  driverForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      telephoneNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
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

  // updateVehicle() {
  //   const vehicle: 
  // }

}

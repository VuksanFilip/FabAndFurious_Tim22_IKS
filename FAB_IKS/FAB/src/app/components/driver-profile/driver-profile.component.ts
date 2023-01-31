import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/service/driver/driver.service';
import { DriverProfile } from 'src/app/model/Driver';
import { VehicleDriverProfile } from 'src/app/model/Vehicle';
import { Location } from 'src/app/model/Location';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit {
  driver: DriverProfile = {
    name: '',
    surname: '',
    telephoneNumber: '',
    email: '',
    address: '',
  }
  
  location: Location = {
    address: '',
    latitude: 0,
    longitude: 0,
  }

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
  }

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.driverService.getDriver(5).subscribe((driverProfile) => (this.driver = driverProfile));
    this.driverService.getDriverVehicle(5).subscribe((vehicleProfile) => (this.vehicle = vehicleProfile));
  }

}

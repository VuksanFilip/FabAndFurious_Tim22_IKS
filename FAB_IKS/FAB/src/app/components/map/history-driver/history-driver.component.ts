import { RideWithNoStatus } from './../../../model/Ride';
import { Location } from './../../../model/Location';
import { Component, OnInit } from '@angular/core';
import 'leaflet-routing-machine';
import { DriverService } from 'src/app/service/driver/driver.service';
import { DriverRides } from 'src/app/model/Driver';
import { IdEmail } from 'src/app/model/User';
import { Path } from 'src/app/model/Location';
import { ReasonAndTimeOfRejection } from 'src/app/model/Rejection';

@Component({
  selector: 'app-history-driver',
  templateUrl: './history-driver.component.html',
  styleUrls: ['./history-driver.component.css'],
})
export class HistoryDriverComponent implements OnInit {
  taskArray: RidesContent[] = [];

  fillTable(task: RidesContent) {
    this.taskArray.push(task);
  }

  constructor(private driverService: DriverService) {}

  driver: IdEmail = {
    id: 0,
    email: '',
  };

  passenger: IdEmail = {
    id: 0,
    email: '',
  };

  passengers: IdEmail[] = [];

  rejection: ReasonAndTimeOfRejection = {
    reason: '',
    timeOfRejection: '',
  };

  departure: Location = {
    address: '',
    latitude: 0,
    longitude: 0,
  };

  destination: Location = {
    address: '',
    latitude: 0,
    longitude: 0,
  };

  path: Path = {
    departure: this.departure,
    destination: this.destination,
  };

  locations: Path[] = [];

  ride: RideWithNoStatus = {
    id: 0,
    startTime: '',
    endTime: '',
    totalCost: 0,
    driver: this.driver,
    passengers: this.passengers,
    estimatedTimeInMinutes: 0,
    vehicleVehicleName: '',
    babyTransport: false,
    petTransport: false,
    rejection: this.rejection,
    locations: this.locations,
    status: '',
  };

  rides: RideWithNoStatus[] = [];

  allRides: DriverRides = {
    totalCount: 0,
    results: this.rides,
  };

  ngOnInit(): void {
    this.driverService.getDriverRides(5).subscribe((rides2) => {
      this.allRides = rides2;
      this.generateSmartTable();
    });
  }

  generateSmartTable() {
    for (let i = 0; i < this.allRides.results.length; i += 1) {
      this.fillTable({
        column1: this.allRides.results[i],
        column2: this.allRides.results[i + 1],
      });
    }
  }
}

export interface RidesContent {
  column1: RideWithNoStatus;
  column2: RideWithNoStatus;
}

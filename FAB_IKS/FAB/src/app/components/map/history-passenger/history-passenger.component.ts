import { Component, AfterViewInit, OnInit } from '@angular/core';
import 'leaflet-routing-machine';
import { PassengerRides } from 'src/app/model/Passenger';
import { PassengerService } from 'src/app/service/passenger/passenger.service';
import { RideWithNoStatus } from 'src/app/model/Ride';
import { IdEmail } from 'src/app/model/User';
import { Location } from 'src/app/model/Location';
import { Route } from 'src/app/model/Location';
import { ReasonAndTimeOfRejection } from 'src/app/model/Rejection';

@Component({
  selector: 'app-history-passenger',
  templateUrl: './history-passenger.component.html',
  styleUrls: ['./history-passenger.component.css'],
})
export class HistoryPassengerComponent implements OnInit {
  taskArray: RidesContent[] = [];

  fillTable(task: RidesContent) {
    this.taskArray.push(task);
  }

  constructor(private passengerService: PassengerService) {}

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

  path: Route = {
    departure: this.departure,
    destination: this.destination,
  };

  locations: Route[] = [];

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
  };

  rides: RideWithNoStatus[] = [];

  allRides: PassengerRides = {
    totalCount: 0,
    results: this.rides,
  };

  ngOnInit(): void {
    this.passengerService.getPassengerRides(1).subscribe((rides2) => {
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

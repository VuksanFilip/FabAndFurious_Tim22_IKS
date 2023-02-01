import { PassengerFavorites } from './../../../model/Passenger';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { RideFavorite, RideWithNoStatus } from 'src/app/model/Ride';
import { IdEmail } from 'src/app/model/User';
import { Location } from 'src/app/model/Location';
import { Path } from 'src/app/model/Location';
import { ReasonAndTimeOfRejection } from 'src/app/model/Rejection';
import { RideService } from 'src/app/service/ride/ride.service';

@Component({
  selector: 'app-favorites-passenger',
  templateUrl: './favorites-passenger.component.html',
  styleUrls: ['./favorites-passenger.component.css'],
})
export class FavoritesPassengerComponent implements OnInit {
  taskArray: RidesContent[] = [];

  fillTable(task: RidesContent) {
    this.taskArray.push(task);
  }

  constructor(private rideService: RideService) {}

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

  ride: RideFavorite = {
    id: 0,
    name: '',
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

  rides: RideFavorite[] = [];

  allRides: PassengerFavorites = {
    totalCount: 0,
    results: this.rides,
  };

  ngOnInit(): void {
    this.rideService.getFavoriteRoutes(2).subscribe((rides2) => {
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
  column1: RideFavorite;
  column2: RideFavorite;
}

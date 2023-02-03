import { Component, OnInit } from '@angular/core';
import 'leaflet-routing-machine';
import { RideFavorite, RideFavorites } from 'src/app/model/Ride';
import { Location } from 'src/app/model/Location';
import { Route } from 'src/app/model/Location';
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

  ride: RideFavorite = {
    id: 0,
    favoriteName: '',
    vehicleVehicleName: '',
    babyTransport: false,
    petTransport: false,
    locations: this.locations,
  };

  rides: RideFavorite[] = [];

  allRides: RideFavorites = {
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

  removeFavorite(): void {
    this.rideService.deleteFavoriteRoute('1').subscribe((rides2) => {
      this.allRides = rides2;
      this.generateSmartTable();
    });
  }
}

export interface RidesContent {
  column1: RideFavorite;
  column2: RideFavorite;
}

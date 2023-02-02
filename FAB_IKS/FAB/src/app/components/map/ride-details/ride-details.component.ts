import { RidesContent } from './../favorites-passenger/favorites-passenger.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { RideService } from 'src/app/service/ride/ride.service';
import { Ride, RideWithNoStatus } from 'src/app/model/Ride';
import { IdEmail } from 'src/app/model/User';
import { Location } from 'src/app/model/Location';
import { Route } from 'src/app/model/Location';
import { ReasonAndTimeOfRejection } from 'src/app/model/Rejection';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css'],
})
export class RideDetailsComponent implements OnInit {
  private map: any;
  // markers: Array<any> = [];
  fromMarker: any;
  toMarker: any;

  routeForm = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
  });

  constructor(
    private mapService: MapService,
    private rideService: RideService
  ) {}

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

  ride: Ride = {
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
    sheduledTime: '',
  };

  ngOnInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
    this.rideService.getRide(1).subscribe((ride2) => (this.ride = ride2));
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2555317, 19.8264226],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

    // this.search();
    // this.addMarker();
    //this.registerOnClick();
    // this.route();
  }
}

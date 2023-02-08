import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { CurrentRidePassenger } from 'src/app/model/Ride';
import { PassengerService } from 'src/app/service/passenger/passenger.service';
import { RideService } from 'src/app/service/ride/ride.service';
import { MapService } from '../map.service';
import { Location } from 'src/app/model/Location';
import { PanicReason } from 'src/app/model/Panic';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/auth/token/token.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-current-drive-pessanger',
  templateUrl: './current-drive-pessanger.component.html',
  styleUrls: ['./current-drive-pessanger.component.css'],
})
export class CurrentDrivePessangerComponent implements AfterViewInit {
  private map: any;

  panicForm = new FormGroup(
    {
      reason: new FormControl('', [Validators.required])
    }
  )

  departure: Location = {
    address: '',
    latitude: 0,
    longitude: 0,
  }

  destination: Location = {
    address: '',
    latitude: 0,
    longitude: 0,
  }

  activeRide: CurrentRidePassenger = {
    id: 0,
    startTime: '',
    endTime: '',
    driverEmail: '',
    estimatedTimeInMinutes: 0,
    vehicleType: '',
    babies: false,
    pets: false,
    departure: this.departure,
    destination: this.destination,
    scheduledTime: '',
  }

  constructor(private mapService: MapService, private passengerService: PassengerService, private rideService: RideService, private tokenDecoder: TokenService) {}

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
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

  }

  ngOnInit(){
    const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
    this.rideService.getActiveRideForPassenger(tokenInfo.id).subscribe((res) => {
      this.departure = res.locations[0].departure;
      this.destination = res.locations[0].destination;
      this.activeRide.id = res.id;
      this.activeRide.startTime = res.startTime;
      this.activeRide.endTime = res.endTime;
      this.activeRide.driverEmail = res.driver.email;
      this.activeRide.estimatedTimeInMinutes = res.estimatedTimeInMinutes;
      this.activeRide.vehicleType = res.vehicleType;
      this.activeRide.babies = res.babyTransport;
      this.activeRide.pets = res.petTransport;
      this.activeRide.departure = this.departure;
      this.activeRide.destination = this.destination;
      this.activeRide.scheduledTime = res.scheduledTime;
    })
    L.marker([this.activeRide.departure.latitude, this.activeRide.departure.longitude]).addTo(this.map);
    L.marker([this.activeRide.destination.latitude, this.activeRide.destination.longitude]).addTo(this.map);
  }

  panic(){
    const panic: PanicReason = {
      reason: this.panicForm.value.reason!,
    }
    const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
    this.rideService.setPanicReason(tokenInfo.id, this.activeRide.id, panic).subscribe({
      next: (res) => {
        alert()
      },
      error: (error) => {
        if(error instanceof HttpErrorResponse){
          alert("Can not put panic!")
        }
      }
    }
      );
  }
}

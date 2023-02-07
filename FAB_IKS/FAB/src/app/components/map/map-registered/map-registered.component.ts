import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { Location } from 'src/app/model/Location';
import { Route } from 'src/app/model/Location';
import { AssumptionRequest, EstimatedValues } from 'src/app/model/Assumption';
import { UnregisteredUserService } from 'src/app/service/unregistered user/unregistered-user.service';
import { RideService } from 'src/app/service/ride/ride.service';
import { RequestRide } from 'src/app/model/Ride';
import { PassengerService } from 'src/app/service/passenger/passenger.service';
import { IdEmail } from 'src/app/model/User';
import { TokenService } from 'src/app/auth/token/token.service';

@Component({
  selector: 'app-map',
  templateUrl: './map-registered.component.html',
  styleUrls: ['./map-registered.component.css'],
})
export class MapRegisteredComponent implements AfterViewInit {
  private map: any;
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
  route: Route = {
    departure: this.departure,
    destination: this.destination,
  }

  routes: Route[] = [];

  assumptionRequest: AssumptionRequest = {
    locations: this.routes,
    vehicleType: '',
    babyTransport: false,
    petTransport: false,
  }

  estimatedValues: EstimatedValues = {
    estimatedTimeInMinutes: 0,
    estimatedCost: 0,
}

  markers = new Array();

  rideForm = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
    babies: new FormControl(false, [Validators.required]),
    pets: new FormControl(false, [Validators.required]),
    type: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    reservation: new FormControl('', [Validators.required]),
  });

  constructor(private mapService: MapService, private unregisteredUserService: UnregisteredUserService, private rideService: RideService, private passengerService: PassengerService, private tokenDecoder: TokenService) {}

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
    this.registerOnClick();
  }

  registerOnClick(): void {

    this.map.on('click', (e: any) => {
      if (this.markers.length != 2) {
        const coord = e.latlng;
        const lat = coord.lat;
        const lng = coord.lng;
        const mp = new L.Marker([lat, lng]).addTo(this.map);
        this.markers.push(mp);
      }

    });

  }

  getAssumptionByClick(){
    if(this.markers.length == 0){
      alert("Choose departure and destination by clicking on the map!");
    }
    if(this.markers.length == 1){
      alert("Missing destination! Click on the map.");
    }
    if(this.markers.length == 2){
      this.mapService.reverseSearch(this.markers[0].getLatLng().lat, this.markers[0].getLatLng().lng).subscribe((res) => {
        this.departure.address = res.display_name;
      });
      this.mapService.reverseSearch(this.markers[1].getLatLng().lat, this.markers[0].getLatLng().lng).subscribe((res) => {
        this.destination.address = res.display_name;
      });
      this.departure.latitude = this.markers[0].getLatLng().lat;
      this.departure.longitude = this.markers[0].getLatLng().lng;
      this.destination.latitude = this.markers[1].getLatLng().lat;
      this.destination.longitude = this.markers[1].getLatLng().lng;
      this.route.departure = this.departure;
      this.route.destination = this.destination;
      this.routes.push(this.route);
      this.assumptionRequest = {
        locations: this.routes,
        vehicleType: this.rideForm.value.type!,
        babyTransport: this.rideForm.value.babies!,
        petTransport: this.rideForm.value.pets!
      }
      this.unregisteredUserService.getAssumption(this.assumptionRequest).subscribe((res) => {
        this.estimatedValues = {
          estimatedTimeInMinutes: res.estimatedTimeInMinutes,
          estimatedCost: res.estimatedCost,
        }
      })
    }
  }

  getAssumptionByForm(){
    this.mapService.search(this.rideForm.value.from).subscribe((res) => {
      this.departure.address = this.rideForm.value.from;
      this.departure.latitude = res[0].lat;
      this.departure.longitude = res[0].lon;
      const mp = new L.Marker([this.departure.latitude, this.departure.longitude]).addTo(this.map);
      this.markers.push(mp);
    });
    this.mapService.search(this.rideForm.value.to).subscribe((res) => {
      this.destination.address = this.rideForm.value.to;
      this.destination.latitude = res[0].lat;
      this.destination.longitude = res[0].lon;
      const mp = new L.Marker([this.destination.latitude, this.destination.longitude]).addTo(this.map);
      this.markers.push(mp);
    });
    this.route.departure = this.departure;
    this.route.destination = this.destination;
    this.routes.push(this.route);
    this.assumptionRequest = {
      locations: this.routes,
      vehicleType: this.rideForm.value.type!,
      babyTransport: this.rideForm.value.babies!,
      petTransport: this.rideForm.value.pets!
    }
    this.unregisteredUserService.getAssumption(this.assumptionRequest).subscribe((res) => {
      this.estimatedValues = {
        estimatedTimeInMinutes: res.estimatedTimeInMinutes,
        estimatedCost: res.estimatedCost,
      }
    })
  }

  getAssumption(){
    if(this.rideForm.value.from == null){
      this.getAssumptionByClick();
    } else{
      this.getAssumptionByForm();
    }
  }

  createRide(){
    const departure: Location = {
      address: this.departure.address,
      latitude: this.departure.latitude,
      longitude: this.departure.longitude
    }
    const destination: Location = {
      address: this.destination.address,
      latitude: this.destination.latitude,
      longitude: this.destination.longitude
    }
    const route: Route = {
      departure: departure,
      destination: destination
    }
    const routes: Route[] = [];
    routes.push(route);
    const passenger: IdEmail = {
      id: 0,
      email: '',
    }
    const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
    this.passengerService.getPassenger(tokenInfo.id).subscribe((res) => {
      passenger.id = res.id;
      passenger.email = res.email;
      console.log(passenger);
    });
    console.log(passenger);
    const passengers: IdEmail[] = [];
    passengers.push(passenger);
    let time: Date = new Date();  
    if(this.rideForm.value.time == "Reservation"){
      let timeString = this.rideForm.value.reservation!;
      let val = timeString.split(":");
      time.setHours(Number(val[0]));
      time.setMinutes(Number(val[1]));
    }
    const newRide: RequestRide = {
      locations: routes,
      passengers: passengers,
      vehicleType: this.rideForm.value.type!,
      babyTransport: this.rideForm.value.babies!,
      petTransport: this.rideForm.value.pets!,
      scheduledTime: time.toString(),
    }
    this.rideService.createNewRide(newRide).subscribe((res) => {
      console.log(res);
    });
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }
}

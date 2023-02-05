import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { AssumptionRequest, EstimatedValues } from 'src/app/model/Assumption';
import { Route, Location } from 'src/app/model/Location';
import { UnregisteredUserService } from 'src/app/service/unregistered user/unregistered-user.service';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map-unregistered',
  templateUrl: './map-unregistered.component.html',
  styleUrls: ['./map-unregistered.component.css'],
})
export class MapUnregisteredComponent implements AfterViewInit {
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

  routeForm = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
    babies: new FormControl(false, [Validators.required]),
    pets: new FormControl(false, [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  constructor(private mapService: MapService, private unregisteredUserService: UnregisteredUserService) {}

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
      alert("Choose departure and destination!");
    }
    if(this.markers.length == 1){
      alert("Missing destination!");
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
        vehicleType: this.routeForm.value.type!,
        babyTransport: this.routeForm.value.babies!,
        petTransport: this.routeForm.value.pets!
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
    if(this.routeForm.value.from == null && this.routeForm.value.to == null){
      alert("Choose departure and destination!");
    }
    if(this.routeForm.value.from == null){
      alert("Missing departure!");
    }
    if(this.routeForm.value.to == null){
      alert("Missing destination!");
    }
    this.mapService.search(this.routeForm.value.from).subscribe((res) => {
      this.departure.address = this.routeForm.value.from;
      this.departure.latitude = res[0].lat;
      this.departure.longitude = res[0].lon;
      const mp = new L.Marker([this.departure.latitude, this.departure.longitude]).addTo(this.map);
      this.markers.push(mp);
    });
    this.mapService.search(this.routeForm.value.to).subscribe((res) => {
      this.destination.address = this.routeForm.value.to;
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
      vehicleType: this.routeForm.value.type!,
      babyTransport: this.routeForm.value.babies!,
      petTransport: this.routeForm.value.pets!
    }
    this.unregisteredUserService.getAssumption(this.assumptionRequest).subscribe((res) => {
      this.estimatedValues = {
        estimatedTimeInMinutes: res.estimatedTimeInMinutes,
        estimatedCost: res.estimatedCost,
      }
    })
  }

  getAssumption(){
    if(this.routeForm.value.from == null){
      this.getAssumptionByClick();
    } else{
      this.getAssumptionByForm();
    }
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }

  restore(): void{
    for(var i = 0; i < this.markers.length; i++){
      this.map.removeLayer(this.markers[i]);
      this.estimatedValues.estimatedTimeInMinutes = 0;
      this.estimatedValues.estimatedCost = 0;
  }
  }
}

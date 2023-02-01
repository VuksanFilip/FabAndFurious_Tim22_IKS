import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Route, Location } from 'src/app/model/Location';
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
  markers = new Array();

  routeForm = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
  });

  constructor(private mapService: MapService) {}

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
    this.registerOnClick();
    // this.route();
  }

  // search(): void {
  //   this.mapService.search('Svetog Nikole 103 Zabalj').subscribe({
  //     next: (result) => {
  //       console.log(result);
  //       L.marker([result[0].lat, result[0].lon])
  //         .addTo(this.map)
  //         .bindPopup('Pozdrav iz Zabalj.')
  //         .openPopup();
  //     },
  //     error: () => {},
  //   });
  // }

  registerOnClick(): void {

    this.map.on('click', (e: any) => {
      if (this.markers.length != 2) {
        const coord = e.latlng;
        const lat = coord.lat;
        const lng = coord.lng;
        const mp = new L.Marker([lat, lng]).addTo(this.map);
        this.markers.push(mp);
        this.mapService.reverseSearch(lat, lng).subscribe();
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
      this.departure.address = this.map.reverseSearch(this.markers[0].getLatLng());
      console.log(this.departure.address);
      // this.destination = this.markers[1];
      // this.route.departure = this.departure;
      // this.route.destination = this.destination;
    }
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }
}

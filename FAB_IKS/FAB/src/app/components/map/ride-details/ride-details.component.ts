import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css'],
})
export class RideDetailsComponent implements AfterViewInit {
  private map: any;
  // markers: Array<any> = [];
  fromMarker: any;
  toMarker: any;

  routeForm = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
  });

  constructor(private mapService: MapService) {}

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

    // this.search();
    // this.addMarker();
    //this.registerOnClick();
    // this.route();
  }
}

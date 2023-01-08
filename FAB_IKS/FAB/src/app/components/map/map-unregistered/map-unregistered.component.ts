import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map-unregistered',
  templateUrl: './map-unregistered.component.html',
  styleUrls: ['./map-unregistered.component.css'],
})
export class MapUnregisteredComponent implements AfterViewInit {
  private map: any;
  // markers: Array<any> = [];
  fromMarker: any;
  toMarker: any;
  // fromMarkerLat: any;
  // fromMarkerLng: any;
  // toMarkerLat: any;
  // toMarkerLng: any;

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
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe();
      const mp = new L.Marker([lat, lng]).addTo(this.map);
      // this.markers.push(mp);
    });

    // if(this.markers.length != 0){
    //   L.Routing.control({
    //     waypoints: [L.latLng(this.markers[0].getLatLng()), L.latLng(this.markers[1].getLatLng())],
    //   }).addTo(this.map);
    // }
  }

  route(): void {
    const routeVal = {
      from: this.routeForm.value.from,
      to: this.routeForm.value.to,
    };

    this.mapService.search(routeVal.from).subscribe({
      next: (result) => {
        const fromMarker = L.marker([result[0].lat, result[0].lon]).addTo(
          this.map
        );
        this.fromMarker = fromMarker;
      },
      error: () => {},
    });

    this.mapService.search(routeVal.to).subscribe({
      next: (result) => {
        const toMarker = L.marker([result[0].lat, result[0].lon]).addTo(
          this.map
        );
        this.toMarker = toMarker;
      },
      error: () => {},
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

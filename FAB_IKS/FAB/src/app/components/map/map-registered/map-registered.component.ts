import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from '../map.service';
import { RideService } from 'src/app/service/ride/ride.service';
import { RequestRide } from 'src/app/model/Ride';
import { Location } from 'src/app/model/Location';
import { Route } from 'src/app/model/Location';
import { IdEmail } from 'src/app/model/User';

@Component({
  selector: 'app-map',
  templateUrl: './map-registered.component.html',
  styleUrls: ['./map-registered.component.css'],
})
export class MapRegisteredComponent implements AfterViewInit {
  private map: any;
  // markers: Array<any> = [];
  fromMarker: any;
  toMarker: any;
  departureMarker: any;
  destinationMarker: any;
  // fromMarkerLat: any;
  // fromMarkerLng: any;
  // toMarkerLat: any;
  // toMarkerLng: any;
  
  routeForm = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
  });

  constructor(private mapService: MapService,private rideService: RideService) {}

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
    // this.registerOnClick();
    // this.route();
    // this.currentRide();
    // L.Marker([result[0].lat, result[0].lng]).addTo(this.map)
  }

  currentRide() : void {
    this.search("Kosovska 12, Novi Sad");
    this.search("Jug Bogdana 10, Novi Sad");
    // this.mapService.search('Kosovska 12, Novi Sad').subscribe({
    //   next: (result) => {
    //     this.departureMarker = new L.Marker([result[0].lat, result[0].lng]).addTo(this.map);
    //   }
    // })
    // this.mapService.search('Jug Bogdana 10, Novi Sad').subscribe({
    //   next: (result) => {
    //     this.destinationMarker = new L.Marker([result[0].lat, result[0].lng]).addTo(this.map);
    //   }
    // })
    // L.Routing.control({
    //       waypoints: [L.latLng(this.departureMarker.getLatLng())],
    //     }).addTo(this.map);
  }

  search(address: any){
    this.mapService.search(address).subscribe({
      next: (result) => {
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map);
      },
      error: () => {},
    });
  }

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
        const fromMarker = L.marker([result[0].lat, result[0].lon])
          .addTo(this.map);
        this.fromMarker = fromMarker;
      },
      error: () => {},
    });

    this.mapService.search(routeVal.to).subscribe({
      next: (result) => {
        const toMarker = L.marker([result[0].lat, result[0].lon])
          .addTo(this.map);
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

  rideForm = new FormGroup(
    {
      from: new FormControl(''),
      to: new FormControl(''),
      // from: new FormControl('', Validators.required),
      // to: new FormControl('', Validators.required),
      // babies: new FormControl(''),
      // pets: new FormControl(''),
      // carType: new FormControl('')
      }
  );



  createRide() : void {
    if(this.rideForm.valid){
      alert("USPEH");

      const location1 : Location = {
        address: 'asd',
        latitude: 123.34,
        longitude: 234.456
      }

      const location2 : Location = {
        address: 'fgh',
        latitude: 123.34,
        longitude: 234.456
      }

      const path : Route = {
        departure: location1,
        destination: location2
      }

      const idEmail : IdEmail = {
        id: 1,
        email: 'pera.peric@email.com'
      }
      let paths: Array<Route> = [path];
      let idEmails: Array<IdEmail> = [idEmail];

      const ride: RequestRide = {
        locations: paths,
        passengers: idEmails,
        // vehicleVehicleName: ?;
        babyTransport: true,
        petTransport: true,
        scheduledTime: 'time',
      };
      this.rideService.createNewRide(ride).subscribe((res: any) => {
        console.log(res);
      })
    }
  }
  

}

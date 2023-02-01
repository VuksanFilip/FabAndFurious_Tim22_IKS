import { Component, AfterViewInit, OnInit } from '@angular/core';
import 'leaflet-routing-machine';
import { PassengerRides } from 'src/app/model/Passenger';
import { PassengerService } from 'src/app/service/passenger/passenger.service';
import { RideWithNoStatus } from 'src/app/model/Ride';
import { IdEmail } from 'src/app/model/User';
import { Location } from 'src/app/model/Location';
import { Path } from 'src/app/model/Location';
import { ReasonAndTimeOfRejection } from 'src/app/model/Rejection';

@Component({
  selector: 'app-history-passenger',
  templateUrl: './history-passenger.component.html',
  styleUrls: ['./history-passenger.component.css'],
})
export class HistoryPassengerComponent implements OnInit {

  constructor(private passengerService: PassengerService) {}

  driver: IdEmail = {
    id: 0,
    email: '',
  }

  passenger: IdEmail = {
    id: 0,
    email: '',
  }

  passengers: IdEmail[] = [];

  rejection: ReasonAndTimeOfRejection = {
    reason: '',
    timeOfRejection: '',
  }

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

  path: Path = {
    departure: this.departure,
    destination: this.destination,
  }

  locations: Path[] = [];

  ride: RideWithNoStatus = {
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
  }

  rides: RideWithNoStatus[] = [];

  allRides: PassengerRides = {
    totalCount: 0,
    results: this.rides,
  }

  ngOnInit(): void {
    this.passengerService.getPassengerRides(2).subscribe((rides2) => (this.allRides = rides2));
    this.driver = this.allRides.results[0].driver;
    this.passenger = this.allRides.results[0].passengers[0];
    this.departure = this.allRides.results[0].locations[0].departure
    this.destination = this.allRides.results[0].locations[0].destination
  //   const idEmailDriver: IdEmail = {
  //     id: this.rides.results[0].driver.id,
  //     email: this.rides.results[0].driver.email,
  //   }
  
  //   const idEmailPassenger1: IdEmail = {
  //     id: this.rides.results[0].passengers[0].id,
  //     email: this.rides.results[0].passengers[0].email,
  //   }
    
  //   let idEmailPassengers: Array<IdEmail> = [idEmailPassenger1];
    
  //   const location1 : Location = {
  //     address: this.rides.results[0].locations[0].departure.address,
  //     latitude: this.rides.results[0].locations[0].departure.longitude,
  //     longitude: this.rides.results[0].locations[0].departure.latitude
  //   }

  //   const location2 : Location = {
      
  //     address: this.rides.results[0].locations[1].departure.address,
  //     latitude: this.rides.results[0].locations[1].departure.longitude,
  //     longitude: this.rides.results[0].locations[1].departure.latitude
  //   }

  //   const path : Path = {
  //     departure: location1,
  //     destination: location2
  //   }

  //   let paths : Array<Path> = [path]

  // const ride1 : RideWithNoStatus = {
  //   id: this.rides.results[0].id,
  //   startTime: this.rides.results[0].startTime,
  //   endTime: this.rides.results[0].endTime,
  //   totalCost: this.rides.results[0].totalCost,
  //   driver: idEmailDriver,
  //   passengers: idEmailPassengers,
  //   estimatedTimeInMinutes: this.rides.results[0].estimatedTimeInMinutes,
  //   vehicleVehicleName: this.rides.results[0].vehicleVehicleName,
  //   babyTransport: this.rides.results[0].babyTransport,
  //   petTransport: this.rides.results[0].petTransport,
  //   rejection: this.rides.results[0].rejection,
  //   locations: paths,
  // }
  }
}

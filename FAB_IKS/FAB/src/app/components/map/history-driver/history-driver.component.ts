import { Component, OnInit } from '@angular/core';
import 'leaflet-routing-machine';
import { DriverService } from 'src/app/service/driver/driver.service';
import { DriverRides } from 'src/app/model/Driver';

@Component({
  selector: 'app-history-driver',
  templateUrl: './history-driver.component.html',
  styleUrls: ['./history-driver.component.css'],
})
export class HistoryDriverComponent implements OnInit {

  constructor(private driverService: DriverService) {}

  rides: DriverRides = {
    totalCount: 0,
    results: [],
  }

  ride2depature : String = this.rides.results[0].locations[0].departure.address;

  ngOnInit(): void {
    this.driverService.getDriverRides(5).subscribe((rides2) => (this.rides = rides2));
    
}
}

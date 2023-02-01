import { RideWithNoStatus } from './../../../model/Ride';
import { Location } from './../../../model/Location';
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
  taskArray: RidesContent[] = [];

  fillTable(task: RidesContent) {
    this.taskArray.push(task);
  }

  constructor(private driverService: DriverService) {}

  rides: DriverRides;

  // rides: DriverRides = {
  //   totalCount: 0,
  //   results: RideWithNoStatus[]
  // };

  ngOnInit(): void {
    this.driverService.getDriverRides(5).subscribe((res: DriverRides) => {
      this.rides = res;
      this.generateSmartTable();
    });
  }

  generateSmartTable() {
    for (let i = 0; i < this.rides.results.length; i += 1) {
      this.fillTable({
        column1: this.rides.results[i],
        column2: this.rides.results[i + 1],
      });
    }
  }
}

export interface RidesContent {
  column1: RideWithNoStatus;
  column2: RideWithNoStatus;
}

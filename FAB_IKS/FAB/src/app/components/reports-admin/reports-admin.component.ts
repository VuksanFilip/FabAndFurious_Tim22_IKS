import { Component, OnInit } from '@angular/core';
import { PassengerService } from 'src/app/service/passenger/passenger.service';
import { Chart } from 'node_modules/chart.js';
import { DriverService } from 'src/app/service/driver/driver.service';
import { DriverRides } from 'src/app/model/Driver';
import { IdEmail } from 'src/app/model/User';
import { Route } from 'src/app/model/Location';
import { ReasonAndTimeOfRejection } from 'src/app/model/Rejection';
import { RideWithNoStatus } from './../../model/Ride';
import { Location } from './../../model/Location';
import { parse } from 'date-fns';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reports-admin',
  templateUrl: './reports-admin.component.html',
  styleUrls: ['./reports-admin.component.css'],
})
export class ReportsAdminComponent implements OnInit {
  constructor(private passengerService: PassengerService) {}

  driver: IdEmail = {
    id: 0,
    email: '',
  };

  passenger: IdEmail = {
    id: 0,
    email: '',
  };

  passengers: IdEmail[] = [];

  rejection: ReasonAndTimeOfRejection = {
    reason: '',
    timeOfRejection: '',
  };

  departure: Location = {
    address: '',
    latitude: 0,
    longitude: 0,
  };

  destination: Location = {
    address: '',
    latitude: 0,
    longitude: 0,
  };

  path: Route = {
    departure: this.departure,
    destination: this.destination,
  };

  locations: Route[] = [];

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
  };

  rides: RideWithNoStatus[] = [];

  allRides: DriverRides = {
    totalCount: 0,
    results: this.rides,
  };

  from = new Date();
  to = new Date();

  ngOnInit(): void {
    this.passengerService.getPassengerRides(2).subscribe((rides2) => {
      this.allRides = rides2; //ili od vozaca
    });

    const data = {
      value1: '2023-01-25 16:00:00',
      value2: '2023-02-02 16:00:00',
    };

    this.from = parse(data.value1, 'yyyy-MM-dd HH:mm:ss', new Date());
    this.to = parse(data.value2, 'yyyy-MM-dd HH:mm:ss', new Date());

    let j = 0;
    let n = 0;
    let labels1: string[] = [];
    let data1 = [];
    let data2 = [];
    let data3 = [];

    for (let i = 0; i < this.allRides.results.length; i += 1) {
      if (
        parse(
          this.allRides.results[i].startTime,
          'yyyy-MM-dd HH:mm:ss',
          new Date()
        ) >= this.from &&
        parse(
          this.allRides.results[i].startTime,
          'yyyy-MM-dd HH:mm:ss',
          new Date()
        ) <= this.to
      ) {
        n = 0;
        for (let m = 0; m < labels1.length; m += 1) {
          if (labels1[m] == this.allRides.results[i].startTime) {
            data1[m] += 1;
            data2[m] += 20; //predjeni km
            data3[m] += this.allRides.results[i].totalCost;
            n = 1;
          }
        }

        if (n == 0) {
          labels1[j] = this.allRides.results[i].startTime;
          data1[j] = 1;
          data2[j] = 20; //predjeni km
          data3[j] = this.allRides.results[i].totalCost;
          j += 1;
        }
      }
    }

    var myChart1 = new Chart('chart1', {
      type: 'bar',
      data: {
        labels: labels1,
        datasets: [
          {
            label: '# of Rides',
            data: data1,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    var myChart2 = new Chart('chart2', {
      type: 'bar',
      data: {
        labels: labels1,
        datasets: [
          {
            label: '# of Km',
            data: data2,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    var myChart3 = new Chart('chart3', {
      type: 'bar',
      data: {
        labels: labels1,
        datasets: [
          {
            label: '# of Spent/Earned money',
            data: data3,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  requestForm = new FormGroup({
    from_date: new FormControl('', Validators.required),
    to_date: new FormControl('', Validators.required),
    type: new FormControl(''),
  });

  show(): void {
    const form = document.getElementById('form');
    if (form != null) {
      if (form.style.display === 'none') {
        form.style.display = 'block';
      } else {
        form.style.display = 'none';
      }
    }
  }
}

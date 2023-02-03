import { ReportMoney, Reportmoney } from './../../model/Reports';
import { Component, OnInit } from '@angular/core';
import { parse } from 'date-fns';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from 'src/app/service/reports/reports.service';
import {
  Reportday,
  ReportDay,
  ReportKm,
  Reportkm,
  ReportRequest,
} from 'src/app/model/Reports';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  constructor(private reportService: ReportsService) {}

  reportday: Reportday = {
    date: new Date(),
    count: 0,
  };

  reportdays: Reportday[] = [];

  reportDays: ReportDay = {
    sum: 0,
    average: 0,
    results: this.reportdays,
  };

  reportkm: Reportkm = {
    date: new Date(),
    count: 0,
  };

  reportkms: Reportkm[] = [];

  reportKms: ReportKm = {
    sum: 0,
    average: 0,
    results: this.reportkms,
  };

  reportmoney: Reportmoney = {
    date: new Date(),
    count: 0,
  };

  reportmoneyy: Reportmoney[] = [];

  reportMoney: ReportMoney = {
    sum: 0,
    average: 0,
    results: this.reportmoneyy,
  };

  ngOnInit(): void {}

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

        const dates: ReportRequest = {
          // from: this.requestForm.value.from_date!,
          // to: this.requestForm.value.to_date!,
          from: '2023-01-27',
          to: '2023-02-02',
        };

        console.log(dates);

        this.reportService.getReportDays(2, dates).subscribe((reportDays2) => {
          this.reportDays = reportDays2;
        });

        console.log(this.reportDays);
        const count1: number[] = [];
        const count2: number[] = [];
        const count3: number[] = [];
        const dates1: string[] = [];
        const dates2: string[] = [];
        const dates3: string[] = [];

        for (var i = 0; i < this.reportDays.results.length; i += 1) {
          count1.push(this.reportDays.results[i].count);
          dates1.push(this.reportDays.results[i].date.toDateString());
        }
        for (var i = 0; i < this.reportKms.results.length; i += 1) {
          dates2.push(this.reportKms.results[i].date.toDateString());
        }
        for (var i = 0; i < this.reportMoney.results.length; i += 1) {
          dates3.push(this.reportMoney.results[i].date.toDateString());
        }

        new Chart('chart1', {
          type: 'bar',
          data: {
            labels: dates1,
            datasets: [
              {
                label: 'Rides per day',
                data: count1,
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
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: 'Km per day',
                data: count2,
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
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: 'Money',
                data: count3,
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
      } else {
        form.style.display = 'none';
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { parse } from 'date-fns';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from 'src/app/service/reports/reports.service';
import { Reportday, ReportDay, ReportRequest } from 'src/app/model/Reports';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  constructor(private reportService: ReportsService) {}

  reportday: Reportday = {
    date: '',
    count: 0,
  };

  reportdays: Reportday[] = [];

  reportDays: ReportDay = {
    sum: 0,
    average: 0,
    results: this.reportdays,
  };

  dates: ReportRequest = {
    from: '2023-01-07',
    to: '2023-02-02',
  };

  fromm = new Date();
  too = new Date();

  ngOnInit(): void {
    this.reportService.getReportDays(2, this.dates).subscribe((reportDays2) => {
      this.reportDays = reportDays2;
    });

    console.log(this.reportDays);

    // const data = {
    //   value1: '2023-01-25 16:00:00',
    //   value2: '2023-02-02 16:00:00',
    // };

    // this.fromm = parse(data.value1, 'yyyy-MM-dd HH:mm:ss', new Date());
    // this.too = parse(data.value2, 'yyyy-MM-dd HH:mm:ss', new Date());

    // let j = 0;
    // let n = 0;
    // let labels1: string[] = [];
    // let data1 = [];
    // let data2 = [];
    // let data3 = [];

    // var myChart1 = new Chart('chart1', {
    //   type: 'bar',
    //   data: {
    //     labels: labels1,
    //     datasets: [
    //       {
    //         label: '# of Rides',
    //         data: data1,
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });

    // var myChart2 = new Chart('chart2', {
    //   type: 'bar',
    //   data: {
    //     labels: labels1,
    //     datasets: [
    //       {
    //         label: '# of Km',
    //         data: data2,
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });

    // var myChart3 = new Chart('chart3', {
    //   type: 'bar',
    //   data: {
    //     labels: labels1,
    //     datasets: [
    //       {
    //         label: '# of Spent/Earned money',
    //         data: data3,
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });
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

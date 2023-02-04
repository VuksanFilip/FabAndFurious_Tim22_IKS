import { Component, OnInit } from '@angular/core';
import { ChangeDriverInfo, ChangeDriversInfo, ChangeRequest } from 'src/app/model/Driver';
import { DriverService } from 'src/app/service/driver/driver.service';

@Component({
  selector: 'app-change-drivers-info',
  templateUrl: './change-drivers-info.component.html',
  styleUrls: ['./change-drivers-info.component.css']
})
export class ChangeDriversInfoComponent implements OnInit {
//   name: string;
//   surname: string;
//   profilePicture: string;
//   telephoneNumber: string;
//   email: string;
//   address: string;
// }

// export interface ChangeDriverInfo{
//   driverId: string;
//   request: ChangeRequest;
// }

// export interface ChangeDriversInfo {
//   allRequests: ChangeDriverInfo[];
// }

changeRequest : ChangeRequest = {
  name: '',
  surname: '',
  profilePicture: '',
  telephoneNumber: '',
  email: '',
  address: ''

}

changeDriverInfo : ChangeDriverInfo = {
  driverId: '',
  request: this.changeRequest
}

allRequests: ChangeDriverInfo[] = [];

taskArray: ChangesContent[] = [];

fillTable(task: ChangesContent) {
  this.taskArray.push(task);
}

constructor(private driverService: DriverService) {}

ngOnInit(): void {
  this.driverService.getAllEditRequests().subscribe((requests2) => {
    this.allRequests = requests2;
    this.generateSmartTable();
  });
  console.log(this.allRequests)
}

generateSmartTable() {
  for (let i = 0; i < this.allRequests.length; i += 1) {
    this.fillTable({
      column1: this.allRequests[i],
      column2: this.allRequests[i + 1],
    });
  }
}

}

export interface ChangesContent {
  column1: ChangeDriverInfo;
  column2: ChangeDriverInfo;
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenService } from 'src/app/auth/token/token.service';
import { EndingWorkingHour, StartingWorkingHour } from 'src/app/model/Driver';
import { DriverService } from 'src/app/service/driver/driver.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: string = 'UNREGISTERED';
  driverState: string = 'ONLINE';

  startingWorkingHour: StartingWorkingHour = {
    start: new Date()
  }

  endWorkingHour: EndingWorkingHour = {
    end: new Date()
  }

  constructor(private tokenDecoder: TokenService, private authService: AuthService, private router: Router, private driverService: DriverService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
      this.role = tokenInfo.role;
    }
  }

  logout(){
    // this.authService.logout().subscribe((res) => {
      this.role = 'UNREGISTERED';
      localStorage.removeItem('user');
      this.authService.setUser();
      this.router.navigate(['map-unregistered']);
    // })
  }

  goOffline(){
    const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
    this.endWorkingHour.end = new Date();
    //ne radi
    // this.driverService.updateWorkingHour(tokenInfo.id, this.startingWorkingHour).subscribe();
    this.driverState = 'OFFLINE';
  }

  goOnline(){
    const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
    this.startingWorkingHour.start = new Date();
    this.driverService.createDriverWorkingHour(tokenInfo.id, this.startingWorkingHour).subscribe();
    this.driverState = 'ONLINE';
  }

}

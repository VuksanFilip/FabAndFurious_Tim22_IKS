import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenService } from 'src/app/auth/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: string = 'UNREGISTERED';

  constructor(private tokenDecoder: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
      this.role = tokenInfo.role;
    }
  }

  logout(){
    this.authService.logout().subscribe((res) => {
      this.role = 'UNREGISTERED';
      localStorage.removeItem('user');
      this.authService.setUser();
      this.router.navigate(['map-unregistered']);
    })
  }

}

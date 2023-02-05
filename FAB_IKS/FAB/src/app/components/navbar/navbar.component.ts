import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: string = 'UNREGISTERED';

  constructor(private tokenDecoder: TokenService) { }

  ngOnInit(): void {
    const tokenInfo = this.tokenDecoder.getDecodeAccessToken();
    if (tokenInfo != null){ //TODO proveriti kad implementiras logout
      this.role = tokenInfo.role;
    }
  }

}

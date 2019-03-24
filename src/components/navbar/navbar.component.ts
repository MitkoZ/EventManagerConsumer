import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  public currentUser: String;
  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.setCurrentUsername();
    this.authenticationService.isTokenDeleted.subscribe(() => this.currentUser = null);
  }

  public setCurrentUsername(): void {
    let token = this.authenticationService.getToken();
    if (!token || this.authenticationService.isTokenExpired()) {
      return;
    }
    let decodedToken = jwt_decode(token);
    this.currentUser = decodedToken.nameid;
  }

  public logout(): void {
    this.authenticationService.logout();
  }
}

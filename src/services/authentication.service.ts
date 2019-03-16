import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginDTO } from 'src/DTOs/login-dto';
import { TokenDTO } from 'src/DTOs/token-dto';
import { Constants } from 'src/utils/constants';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {

  }

  public login(loginDTO: LoginDTO): Observable<String> {
    return this.http.post<String>(Constants.GENERATE_TOKEN_ENDPOINT, loginDTO);
  }

  public saveToken(tokenDTO: TokenDTO): void {
    localStorage.setItem("token", tokenDTO.token);

    const expiresAt = moment().add(25, "minute");
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  public getToken(): TokenDTO {
    let tokenDTO: TokenDTO = new TokenDTO();
    tokenDTO.token = localStorage.getItem("token");

    return tokenDTO;
  }

  public isExpired(): Boolean {
    return moment().isAfter(this.getExpiration());
  }

  private getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoginDTO } from 'src/DTOs/login-dto';
import { TokenDTO } from 'src/DTOs/token-dto';
import { Constants } from 'src/utils/constants';
import * as moment from "moment";
import { RegisterDTO } from 'src/DTOs/register-dto';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public isTokenDeleted = new Subject<Boolean>();
  constructor(private http: HttpClient) {

  }

  public login(loginDTO: LoginDTO): Observable<String> {
    return this.http.post<String>(Constants.GENERATE_TOKEN_ENDPOINT, loginDTO);
  }

  public register(registerDTO: RegisterDTO): Observable<String> {
    return this.http.post<String>(Constants.REGISTER_ENDPOINT, registerDTO);
  }

  public saveToken(tokenDTO: TokenDTO): void {
    localStorage.setItem("token", tokenDTO.token);

    const expiresAt = moment().add(25, "minute");
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  public getToken(): String {
    let tokenDTO: TokenDTO = new TokenDTO();
    tokenDTO.token = localStorage.getItem("token");

    return tokenDTO.token;
  }

  public isTokenExpired(): Boolean {
    return moment().isAfter(this.getExpiration());
  }

  private getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    this.isTokenDeleted.next(true);
  }
}

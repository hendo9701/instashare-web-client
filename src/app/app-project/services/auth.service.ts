import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {SigninModel} from "../models/signin";
import {SigninResponseModel} from "../models/signinResponse";

export const ACCESS_TOKEN: string = 'InstashareAccessKey';
export const LOGGED_USER_EMAIL: string = 'LoggedUserEmail';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    protected http: HttpClient
  ) { }

  getToken(): string {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return token ? token : '';
  }

  setToken(signinResponse: SigninResponseModel): void {
    localStorage.setItem(ACCESS_TOKEN, signinResponse.accessToken);
  }

  cleanToken(): void {
    localStorage.setItem(ACCESS_TOKEN, '');
    localStorage.setItem(LOGGED_USER_EMAIL, '');
  }

  getUser(): string {
    const user = localStorage.getItem(LOGGED_USER_EMAIL);
    return user ? user : '';
  }

  setUser(email: string): void {
    localStorage.setItem(LOGGED_USER_EMAIL, email);
  }

  login(email: string, password: string): Observable<any> {
    const signinModel = new SigninModel(email, password);
    return this.http.post<SigninResponseModel>(`${environment.apiUrl}/v1/signin`, signinModel)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            return '0';
          } else {
            return throwError(err);
          }
        })
      );
  }

  signup(email: string, password: string): Observable<any> {
    const signinModel = new SigninModel(email, password);
    return this.http.post(`${environment.apiUrl}/v1/signup`, signinModel, {responseType: 'text'})
      .pipe(
        catchError(err => {
          if (err.status === 409) {
            return '0';
          } else {
            return throwError(err);
          }
        })
      );
  }
}

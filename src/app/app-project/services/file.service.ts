import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {FileModel} from "../models/fileModel";
import {RenameFileModel} from "../models/renameFileModel";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  headers = new HttpHeaders();

  constructor(
    protected http: HttpClient,
    private authService: AuthService) {
    const token = this.authService.getToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/v1/files/count`, { headers: this.headers })
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getFiles(size: number, skip: number): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(`${environment.apiUrl}/v1/files?size=${size}&skip=${skip}`, { headers: this.headers })
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  updateFileName(id: string, renameFileModel: RenameFileModel): Observable<File> {

    return this.http.patch<File>(`${environment.apiUrl}/v1/files/${id}`, renameFileModel, { headers: this.headers })
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  downloadFile(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/v1/files/${id}`, { headers: this.headers })
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  downloadLink(id: string) {
    let x = this.http.get(`${environment.apiUrl}/v1/files/${id}`, {
      headers: this.headers,
      observe: 'response',
      responseType: 'blob'
    });
    x.subscribe(s => console.log(s));
    return x;
  }
}

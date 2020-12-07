import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interface/user';
import {  catchError, tap } from 'rxjs/operators';
import { IErrorResponse } from '../shared/interface/error';


const authUrl = environment.authUrl;
const credentials = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: IUser | null;
  get isLogged(): boolean { return !!this.currentUser }

  constructor(private http: HttpClient) { }

  authenticate(): Observable<IUser|null> {
    return this.http.get<IUser>(`${authUrl}/profile`, credentials).pipe(
      tap((result: IUser) => {
        this.currentUser = result;
      }),
      catchError(()=>{
        this.currentUser=null;
        return of(null);
      })
    );
  }
}
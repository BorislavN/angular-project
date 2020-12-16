import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../shared/interface/user';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: IUser | null;
  get isLogged(): boolean { return !!this.currentUser }

  constructor(private http: HttpClient) { }

  authenticate(): Observable<IUser | null> {
    return this.http.get<IUser>(`/user/profile`).pipe(
      tap((result: IUser) => {
        this.currentUser = result;
      }),
      catchError(() => {
        this.currentUser = null;
        return of(null);
      })
    );
  };

  logout(): Observable<any> {
    return this.http.post(`/user/logout`, {}).pipe(
      tap(() => this.currentUser = null)
    );
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser } from '../shared/interface/user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser | null | undefined>;
  currentUser$: Observable<IUser | null | undefined>;
  isLogged$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLogged$ = this.currentUser$.pipe(map(user => !!user));
  };

  authenticate(): Observable<IUser | null> {
    return this.http.get<IUser>(`/user/profile`).pipe(
      tap((result: IUser) => {
        this.currentUserSubject.next(result);
      }),
      catchError(() => {
        this.currentUserSubject.next(null);
        return of(null);
      })
    );
  };

  logout(): Observable<any> {
    return this.http.post(`/user/logout`, {}).pipe(
      tap(() => this.currentUserSubject.next(null)));
  };

  setCurrentUser(data: IUser): void {
    this.currentUserSubject.next(data);
  };
}
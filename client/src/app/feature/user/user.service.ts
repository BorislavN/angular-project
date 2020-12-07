import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { IUser } from 'src/app/shared/interface/user';
import { environment } from 'src/environments/environment';

const authUrl = environment.authUrl;
const withCredentials = { withCredentials: true };

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    login(data: any): Observable<IUser> {
        return this.http.post(`${authUrl}/login`, data).pipe(
            tap((user: IUser) => this.authService.currentUser = user)
        );
    }

    register(data: any): Observable<IUser> {
        return this.http.post(`${authUrl}/register`, data).pipe(
            tap((user: IUser) =>this.authService.currentUser = user)
        );
    }

    logout(): Observable<any> {
        return this.http.post(`${authUrl}/logout`, {}, withCredentials).pipe(
            tap(() =>this.authService.currentUser = null)
        );
    }

    updateProfile(data: any): Observable<IUser> {
        return this.http.put(`${authUrl}/profile`, data, withCredentials).pipe(
            tap((user: IUser) => this.authService.currentUser = user)
        );
    }

    deposit(data: any): Observable<IUser> {
        return this.http.post(`${authUrl}/balance`, data, withCredentials).pipe(
            tap((user: IUser) => this.authService.currentUser = user)
        );
    }

    withdraw(data: any): Observable<IUser> {
        return this.http.delete(`${authUrl}/balance`, withCredentials).pipe(
            tap((user: IUser) => this.authService.currentUser = user)
        );
    }
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { IResponseMessage } from 'src/app/shared/interface/message';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;
const withCredentials = { withCredentials: true };

@Injectable()
export class CarService {
    constructor(private http: HttpClient) { }

    addCar(data: FormData): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(`${apiUrl}/users/collection`, data,withCredentials);
    }

    // login(data: any): Observable<IUser> {
    //     return this.http.post(`${authUrl}/login`, data, withCredentials).pipe(
    //         tap((user: IUser) => this.authService.currentUser = user)
    //     );
    // }

    // register(data: any): Observable<IUser> {
    //     return this.http.post<IUser>(`${authUrl}/register`, data, withCredentials);
    // }

    // updateProfile(data: any): Observable<IUser> {
    //     return this.http.put(`${authUrl}/profile`, data, withCredentials).pipe(
    //         tap((user: IUser) => this.authService.currentUser = user)
    //     );
    // }

    // deposit(data: any): Observable<IUser> {
    //     return this.http.post(`${authUrl}/balance`, data, withCredentials).pipe(
    //         tap((user: IUser) => this.authService.currentUser = user)
    //     );
    // }

    // withdraw(data: any): Observable<IUser> {
    //     return this.http.delete(`${authUrl}/balance`, withCredentials).pipe(
    //         tap((user: IUser) => this.authService.currentUser = user)
    //     );
    // }
};
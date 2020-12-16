import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { IOfferCard } from 'src/app/shared/interface/offer';
import { IUser } from 'src/app/shared/interface/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    login(data: any): Observable<IUser> {
        return this.http.post(`/user/login`, data).pipe(
            tap((user: IUser) => this.authService.setCurrentUser(user))
        );
    }

    register(data: any): Observable<IUser> {
        return this.http.post<IUser>(`/user/register`, data);
    }

    updateProfile(data: any): Observable<IUser> {
        return this.http.put(`/user/profile`, data).pipe(
            tap((user: IUser) => this.authService.setCurrentUser(user))
        );
    }

    deposit(data: { transaction: number }): Observable<IUser> {
        return this.http.post(`/user/balance`, data).pipe(
            tap((user: IUser) => this.authService.setCurrentUser(user))
        );
    }

    withdraw(data: { transaction: number }): Observable<IUser> {
        return this.http.put(`/user/balance`, data).pipe(
            tap((user: IUser) => this.authService.setCurrentUser(user))
        );
    }

    getMyOffers(): Observable<IOfferCard[]> {
        return this.http.get<IOfferCard[]>(`/users/offers`);
    }

    getCurrentUser(): Observable<IUser | null | undefined> {
        return this.authService.currentUser$;
    }
};
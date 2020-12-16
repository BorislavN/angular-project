import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ICarCard } from 'src/app/shared/interface/car-card';
import { ICar } from 'src/app/shared/interface/car-details';
import { IResponseMessage } from 'src/app/shared/interface/message';

@Injectable()
export class CarService {
    constructor(private http: HttpClient) { }

    addCar(data: FormData): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(`/users/collection`, data);
    }

    getMyCollection(): Observable<ICarCard[]> {
        return this.http.get<ICarCard[]>(`/users/collection`);
    }

    getCar(id: String): Observable<ICar> {
        return this.http.get<ICar>(`/users/collection/${id}`);
    }

    sellCar(data: { carId: String, price: Number, description: String }): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(`/offers`, data);
    }

    deleteCar(carId: String): Observable<IResponseMessage> {
        return this.http.delete<IResponseMessage>(`/users/collection/${carId}`);
    }

    editCar(id: String, data: FormData): Observable<ICar> {
        return this.http.put<ICar>(`/users/collection/${id}`, data);
    }
};
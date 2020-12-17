import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseMessage } from 'src/app/shared/interface/message';
import { IOffer } from 'src/app/shared/interface/offer-details';
import { IOffersWithPagination } from 'src/app/shared/interface/offer-pagination';

@Injectable()
export class OfferService {
    constructor(private http: HttpClient) { }

    getOfferDetails(offerId: String): Observable<IOffer> {
        return this.http.get<IOffer>(`/offers/${offerId}`);
    }

    getAllOffers(page: number): Observable<IOffersWithPagination> {
        return this.http.get<IOffersWithPagination>(`/offers?page=${page}`);
    }

    deleteOffer(offerId: String, carId: String): Observable<IResponseMessage> {
        return this.http.delete<IResponseMessage>(`/offers/${offerId}?carId=${carId}`);
    }

    buyFromOffer(offerId: String): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(`/offers/${offerId}`, {});
    }

    editOffer(offerId: string, data: { price: number, carId: string, description: string }): Observable<{ price: number, description: string }> {
        return this.http.put<{ price: number, description: string }>(`/offers/${offerId}`, data);
    }
};
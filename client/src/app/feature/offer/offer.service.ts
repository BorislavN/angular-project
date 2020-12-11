import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseMessage } from 'src/app/shared/interface/message';
import { IOffer } from 'src/app/shared/interface/offer-details';
import { IOffersWithPagination } from 'src/app/shared/interface/offer-pagination';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;
const withCredentials = { withCredentials: true };

@Injectable()
export class OfferService {
    constructor(private http: HttpClient) { }

    getOfferDetails(offerId: String): Observable<IOffer> {
        return this.http.get<IOffer>(`${apiUrl}/offers/${offerId}`);
    }

    getAllOffers(page: number): Observable<IOffersWithPagination> {
        return this.http.get<IOffersWithPagination>(`${apiUrl}/offers?page=${page}`);
    }

    deleteOffer(offerId: String, carId: String): Observable<IResponseMessage> {
        return this.http.delete<IResponseMessage>(`${apiUrl}/offers/${offerId}?carId=${carId}`, withCredentials);
    }

    buyFromOffer(offerId: String): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(`${apiUrl}/offers/${offerId}`,{}, withCredentials);
    }
};
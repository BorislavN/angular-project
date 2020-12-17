import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IComment } from "src/app/shared/interface/comment";

@Injectable()
export class CommentService {

    constructor(private http: HttpClient) { }

    getComments(offerId: String): Observable<IComment[]> {
        return this.http.get<IComment[]>(`/offers/${offerId}/comments`);
    }

    addComment(offerId: String, data: { text: String }): Observable<IComment[]> {
        return this.http.post<IComment[]>(`/offers/${offerId}/comments`, data);
    }
}
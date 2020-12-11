import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IComment } from "src/app/shared/interface/comment";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;
const withCredentials = { withCredentials: true };

@Injectable()
export class CommentService {

    constructor(private http: HttpClient) { }

    getComments(offerId: String): Observable<IComment[]> {
        return this.http.get<IComment[]>(`${apiUrl}/offers/${offerId}/comments`);
    }

    addComment(offerId: String, data: { text: String }): Observable<IComment[]> {
        return this.http.post<IComment[]>(`${apiUrl}/offers/${offerId}/comments`, data, withCredentials);
    }
}
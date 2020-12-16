import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const { apiUrl, authUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes("http")) {
            let newUrl = "";

            if (req.url.startsWith("/user/")) {
                newUrl = `${authUrl}${req.url}`;
            } else {
                newUrl = `${apiUrl}${req.url}`;
            }

            req = req.clone({ url: newUrl, withCredentials: true });
        }
        return next.handle(req);
    }
};

export const appInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
};
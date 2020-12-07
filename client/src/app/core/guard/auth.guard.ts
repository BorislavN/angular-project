import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IErrorResponse } from 'src/app/shared/interface/error';
import { IUser } from 'src/app/shared/interface/user';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let routeCondition = childRoute.data.isLogged;
    let stream$: Observable<IUser | IErrorResponse>;

    if (this.authService.currentUser === undefined) {
      stream$ = this.authService.authenticate();
    } else {
      stream$ = of(this.authService.currentUser);
    }

    return stream$.pipe(
      map((result: any) => {
        let isLogged = !!result?.username ? true : false;
        
        return (typeof routeCondition !== "boolean" || routeCondition === isLogged);
      }),
      tap((flag) => {
        if (!flag) {
          this.router?.navigateByUrl(this.router.url);
        }
      })
    );
  }
}
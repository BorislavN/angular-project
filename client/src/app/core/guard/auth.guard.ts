import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let routeCondition = childRoute.data.isLogged;

    return this.authService.currentUser$.pipe(
      switchMap(user => user === undefined ? this.authService.authenticate() : [user]),
      map((user) => {
        return (typeof routeCondition !== 'boolean') || (routeCondition === !!user);
      }),
      tap((flag) => {
        if (!flag) {
          this.router?.navigateByUrl(this.router.url);
        }
      }),
      first()
    );
  }
}
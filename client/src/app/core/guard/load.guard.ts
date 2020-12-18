import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoadGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log("in load guard");
    
    return this.authService.currentUser$.pipe(
      switchMap(user => user === undefined ? this.authService.authenticate() : [user]),
      map((user) => !!user),
      tap((flag) => {
        if (!flag) {
          this.router.navigateByUrl(this.router.url);
        }
      }),
      first()
    );
  }
}
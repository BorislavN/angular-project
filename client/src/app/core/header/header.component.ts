import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  get isLogged$(): Observable<boolean> { return this.authService.isLogged$ };

  constructor(private authService: AuthService, private router: Router) { };

  isInCollectionPage(): boolean {
    const url = this.router.url;

    const notAddPage = "/collection/add" !== url;
    const isInCollectionRoute = (url.includes("/collection"));

    return notAddPage && isInCollectionRoute;
  }

  handleLogout(): void {
    this.authService.logout().subscribe({
      next: (data) => {
        this.router.navigateByUrl("/");
      },
      error: (err) => {
        this.router.navigate(['/error'], { queryParams: { error: err.error.message } });
      }
    })
  }
}

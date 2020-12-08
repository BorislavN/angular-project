import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  get isLogged(): boolean { return this.authService.isLogged }

  constructor(private authService: AuthService, private router: Router) { }

  handleLogout(): void {
    this.authService.logout().subscribe({
      next: (data) => {
        this.router.navigateByUrl("/");
      },
      error: (err) => {
        this.router.navigateByUrl("/error",{queryParams:{error:err.error.message}});
      }
    })
  }
}

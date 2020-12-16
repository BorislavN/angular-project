import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  get isLogged$(): Observable<boolean> { return this.authService.isLogged$ };
  username$: Observable<String>;

  constructor(private authService: AuthService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Home");
    this.username$ = this.authService.currentUser$.pipe(map((user) => (!!user?.username) ? user.username : "anonymous"));
  }
}
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  get isLogged(): boolean { return this.authService.isLogged };
  username: String;

  constructor(private authService: AuthService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Home");
    this.username = this.authService.currentUser?.username || "anonymous";
  }


}
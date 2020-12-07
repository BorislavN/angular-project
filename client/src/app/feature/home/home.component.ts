import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLogged: boolean;
  username: String;

  constructor(titleService: Title) {
    titleService.setTitle("Home");
    this.isLogged=false;
    this.username="Pesho";
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  message: String;

  constructor() {
    this.message="2020 - Car Shop project for Angular Course - Creator: BorislavN";
   }
}
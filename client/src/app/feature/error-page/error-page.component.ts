import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  message: String;

  constructor(private titleService: Title, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.titleService.setTitle("Oops");
    this.message = this.route.snapshot.queryParams['error']||"Page Not Found"
  }
}
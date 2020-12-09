import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private offerService: OfferService, private router: Router, private titleService: Title) {

  }

  ngOnInit(): void {
  }

}

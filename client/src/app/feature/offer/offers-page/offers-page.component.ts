import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOffer } from 'src/app/shared/interface/offer-details';
import { OfferService } from '../service/offer.service';

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css']
})
export class OffersPageComponent implements OnInit, OnDestroy {
  offers: IOffer[];
  maxPages: number;
  currentPage: number;
  isLoading: boolean;
  subscription: Subscription;

  constructor(private offerService: OfferService, private titleService: Title, private router: Router, private route: ActivatedRoute) {
    this.offers = [];
    this.isLoading = true;
    this.titleService.setTitle("Offers");
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((value) => {
      this.currentPage = value['page'] || 1;

      this.offerService.getAllOffers(this.currentPage).subscribe({
        next: (result) => {
          this.offers = result.offers;
          this.maxPages = result.maxPages;
          this.currentPage = result.currentPage;
          this.isLoading = false;
        },
        error: (err) => {
          this.router.navigate(['/error'], { queryParams: { error: err.error.message } })
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IOfferCard } from 'src/app/shared/interface/offer';
import { parseUrl } from 'src/app/shared/util/url.parser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  isLoading: boolean;
  myOffers: IOfferCard[];
  urlMap: { [key: string]: String; };

  constructor(private userService: UserService, private tileService: Title, private router: Router) {
    this.isLoading = true;
    this.myOffers = [];
    this.urlMap = {};
  }

  ngOnInit(): void {
    this.tileService.setTitle("My Offers");

    this.userService.getMyOffers().subscribe({
      next: (result) => {
        this.myOffers = result;
        this.myOffers.forEach(e => {
          this.urlMap[e._id] = parseUrl(e.carId.pictures[0]);
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigate(['/error'], { queryParams: { error: err.error.message } })
      }
    });
  }
}
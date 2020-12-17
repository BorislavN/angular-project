import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { IOffer } from 'src/app/shared/interface/offer-details';
import { parseUrl } from 'src/app/shared/util/url.parser';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  userLoggedIn$: Observable<boolean>;
  isOwner$: Observable<boolean>;
  notEnoughMoney: boolean;
  mainPictureUrl: String;
  isInEditForm: boolean;
  currentOffer: IOffer;

  constructor(private route: ActivatedRoute, private authService: AuthService, private titleService: Title) {
    this.notEnoughMoney = false;
    this.isInEditForm = false;
  }

  ngOnInit(): void {
    this.titleService.setTitle("Offer Details");
    this.userLoggedIn$ = this.authService.isLogged$;

    this.currentOffer = this.route.snapshot.data.offer;
    this.isOwner$ = this.authService.currentUser$.pipe(map((user) => (this.currentOffer.authorId.username === (user?.username || ""))));
    this.mainPictureUrl = parseUrl(this.currentOffer.carId.pictures[0]);
  }

  transformUrl(data: { url: String }) {
    return parseUrl(data);
  }

  toggleMainPicture(path: String) {
    this.mainPictureUrl = path;
  }

  toggleMessage(value: boolean): void {
    this.notEnoughMoney = value;
  }

  toggleForm(value: boolean): void {
    this.isInEditForm = value;
  }

  onEdited(data: { price: number, description: string }): void {
    this.currentOffer.price = data.price;
    this.currentOffer.description = data.description;
  }
}
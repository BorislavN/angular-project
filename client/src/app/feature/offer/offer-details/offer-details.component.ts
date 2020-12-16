import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { IOffer } from 'src/app/shared/interface/offer-details';
import { parseUrl } from 'src/app/shared/util/url.parser';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  isInEditForm: boolean;
  isLoading: boolean;
  notEnoughMoney: boolean;
  isOwner$: Observable<boolean>;
  userLoggedIn$: Observable<boolean>;
  currentOffer: IOffer;
  mainPictureUrl: String;

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private offerService: OfferService, private router: Router, private titleService: Title) {
    this.isLoading = true;
    this.notEnoughMoney = false;
    this.isInEditForm = false;
  }

  ngOnInit(): void {
    this.titleService.setTitle("Offer Details");
    const offerId = this.route.snapshot.params['id'];
    this.userLoggedIn$ = this.authService.isLogged$;

    this.offerService.getOfferDetails(offerId).subscribe({
      next: (result) => {
        this.currentOffer = result;
        this.isOwner$ = this.authService.currentUser$.pipe(map((user) => (result.authorId.username === (user?.username || ""))));
        this.mainPictureUrl = parseUrl(result.carId.pictures[0]);
        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigate(['/error'], { queryParams: { error: err.error.message } })
      }
    });
  }

  transformUrl(data: { url: String }) {
    return parseUrl(data);
  }

  toggleMainPicture(path: String) {
    this.mainPictureUrl = path;
  }

  deleteHandler(): void {
    this.offerService.deleteOffer(this.currentOffer._id, this.currentOffer.carId._id).subscribe({
      next: (result) => {
        this.router.navigate(['/collection']);
      },
      error: (err) => {
        this.router.navigate(['/error'], { queryParams: { error: err.error.message } });
      }
    });
  }

  buyCarHandler(): void {
    this.offerService.buyFromOffer(this.currentOffer._id).subscribe({
      next: (result) => {
        this.router.navigate(['/collection']);
      },
      error: (err) => {
        const message = err.error.message || "Unexpected error occurred! Sorry for the inconvenience!";

        if ("Your funds are not sufficient to buy this car!" === message) {
          this.notEnoughMoney = true;
        } else {
          this.router.navigate(['/error'], { queryParams: { error: message } });
        }
      }
    });
  }

  hideMessage(): void {
    this.notEnoughMoney = false;
  }

  showForm(): void {
    this.isInEditForm = true;
  }

  onHideForm(event: boolean): void {
    if (event) {
      this.isInEditForm = false;
    }
  }

  onEdited(data: { price: number, description: string }): void {
    this.currentOffer.price = data.price;
    this.currentOffer.description = data.description;
  }

  navigateToComments(): void {
    this.router.navigate(['/offers', this.currentOffer._id, 'comments']);
  }
}
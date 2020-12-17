import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IOffer } from 'src/app/shared/interface/offer-details';
import { OfferService } from '../service/offer.service';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent {
  @Input("notEnoughMoney") notEnoughMoney: boolean;
  @Input("userLoggedIn") userLoggedIn: boolean;
  @Input("currentOffer") currentOffer: IOffer;
  @Input("isOwner") isOwner: boolean;
  @Output() onOpenEditForm = new EventEmitter<boolean>();
  @Output() onNotEnoughMoney = new EventEmitter<boolean>();

  constructor(private offerService: OfferService, private router: Router) { }

  deleteHandler(): void {
    this.offerService.deleteOffer(this.currentOffer._id, this.currentOffer.carId._id).subscribe({
      next: this.navigateToCollection.bind(this),
      error: this.navigateToErrorPage().bind(this)
    });
  }

  buyCarHandler(): void {
    this.offerService.buyFromOffer(this.currentOffer._id).subscribe({
      next: this.navigateToCollection.bind(this),
      error: (err) => {
        const message = err.error.message || "Unexpected error occurred! Sorry for the inconvenience!";

        if ("Your funds are not sufficient to buy this car!" === message) {
          this.onNotEnoughMoney.emit(true);
        } else {
          this.navigateToErrorPage(message).bind(this);
        }
      }
    });
  }

  openForm(): void {
    this.onOpenEditForm.emit(true);
  }

  navigateToComments(): void {
    this.router.navigate(['/offers', this.currentOffer._id, 'comments']);
  }

  private navigateToCollection(data: any): void {
    this.router.navigate(['/collection']);
  }

  private navigateToErrorPage(message = "") {
    return function (err: any) {
      this.router.navigate(['/error'], { queryParams: { error: (message || err.error.message) } });
    }
  }
}

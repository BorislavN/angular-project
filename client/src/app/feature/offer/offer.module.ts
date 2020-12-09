import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OfferRoutingModule } from './offer-routing.module';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { OffersPageComponent } from './offers-page/offers-page.component';
import { OfferService } from './offer.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OfferDetailsComponent, OfferCardComponent, OffersPageComponent],
  imports: [
    CommonModule,
    OfferRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    OfferService
  ]
})
export class OfferModule { }
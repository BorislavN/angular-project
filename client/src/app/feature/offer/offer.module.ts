import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OfferRoutingModule } from './offer-routing.module';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { OffersPageComponent } from './offers-page/offers-page.component';
import { OfferService } from './offer.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolve';

@NgModule({
  declarations: [OfferDetailsComponent, OfferCardComponent, OffersPageComponent, EditComponent, CommentsComponent],
  imports: [
    CommonModule,
    OfferRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    OfferService, CommentService, CommentResolver
  ]
})
export class OfferModule { }
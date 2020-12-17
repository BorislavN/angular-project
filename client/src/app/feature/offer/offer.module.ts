import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OfferRoutingModule } from './offer-routing.module';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { OffersPageComponent } from './offers-page/offers-page.component';
import { OfferService } from './service/offer.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit-menu/edit-menu.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentService } from './service/comment.service';
import { CommentResolver } from './resolver/comment.resolve';
import { OfferDetailsResolver } from './resolver/offer-details.resolve';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';

@NgModule({
  declarations: [OfferDetailsComponent, OfferCardComponent, OffersPageComponent, EditComponent, CommentsComponent, ActionButtonsComponent],
  imports: [
    CommonModule,
    OfferRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    OfferService, CommentService, CommentResolver,OfferDetailsResolver
  ]
})
export class OfferModule { }
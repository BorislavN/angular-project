import { RouterModule, Routes } from '@angular/router';
import { CommentResolver } from './comment.resolve';
import { CommentsComponent } from './comments/comments.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { OffersPageComponent } from './offers-page/offers-page.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: OffersPageComponent,
    },
    {
        path: ':id',
        component: OfferDetailsComponent,
    },
    {
        path: ':id/comments',
        component: CommentsComponent,
        resolve: { comments: CommentResolver }
    }
];

export const OfferRoutingModule = RouterModule.forChild(routes);
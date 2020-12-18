import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LoadGuard } from './core/guard/load.guard';
import { ErrorPageComponent } from './feature/error-page/error-page.component';
import { HomeComponent } from './feature/home/home.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'user',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./feature/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'offers',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./feature/offer/offer.module').then(m => m.OfferModule)
      },
      {
        path: 'collection',
        canActivateChild: [AuthGuard],
        canLoad: [LoadGuard],
        loadChildren: () => import('./feature/car/car.module').then(m => m.CarModule)
      },
      {
        path: '**',
        component: ErrorPageComponent,
      }
    ]
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './feature/error-page/error-page.component';
import { HomeComponent } from './feature/home/home.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild:[AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: '**',
        component: ErrorPageComponent,
      }
    ]
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'user',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    isLogged: false,
                }
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    isLogged: false,
                },
            },
            {
                path: 'offers',
                component: OfferListComponent,
                data: {
                    isLogged: true,
                },
            }
            // {
            //     path: 'profile',
            //     component: ProfileComponent,
            //     data: {
            //         isLogged: true
            //     }
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);

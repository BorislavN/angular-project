import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { LoginComponent } from './login/login.component';

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
            // {
            //     path: 'register',
            //     component: RegisterComponent,
            //     data: {
            //         isLogged: false,
            //         noNavigation: true,
            //         title: 'REGISTER USER'
            //     },
            // },
            // {
            //     path: 'profile',
            //     component: ProfileComponent,
            //     data: {
            //         isLogged: true,
            //         title: 'USER PROFILE'
            //     }
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);

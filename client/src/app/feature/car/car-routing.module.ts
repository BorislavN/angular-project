import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { AddCarComponent } from './add-car/add-car.component';

const routes: Routes = [
    {
        path: 'user/collection',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'add',
                component: AddCarComponent,
                data: {
                    isLogged: true,
                }
            },
            // {
            //     path: 'register',
            //     component: ,
            //     data: {
            //         isLogged: false,
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

export const CarRoutingModule = RouterModule.forChild(routes);
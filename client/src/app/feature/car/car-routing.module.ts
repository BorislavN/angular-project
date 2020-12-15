import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './add-car/add-car.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CollectionComponent } from './collection/collection.component';

const routes: Routes = [
    {
        path: 'add',
        component: AddCarComponent,
        data: {
            isLogged: true,
        }
    },
    {
        path: '',
        pathMatch: 'full',
        component: CollectionComponent,
        data: {
            isLogged: true,
        }
    },
    {
        path: ':id',
        component: CarDetailsComponent,
        data: {
            isLogged: true,
        }
    }
];

export const CarRoutingModule = RouterModule.forChild(routes);
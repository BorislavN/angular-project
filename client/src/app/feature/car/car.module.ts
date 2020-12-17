import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCarComponent } from './add-car/add-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarRoutingModule } from './car-routing.module';
import { CarService } from './car.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollectionComponent } from './collection/collection.component';
import { CollectionItemComponent } from './collection-item/collection-item.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { SellCarComponent } from './sell-car/sell-car.component';

@NgModule({
  declarations: [AddCarComponent, CollectionComponent, CollectionItemComponent, CarDetailsComponent, EditCarComponent, SellCarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    CarService
  ]
})
export class CarModule { }

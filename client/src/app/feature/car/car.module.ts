import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCarComponent } from './add-car/add-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarRoutingModule } from './car-routing.module';
import { CarService } from './car.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AddCarComponent],
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

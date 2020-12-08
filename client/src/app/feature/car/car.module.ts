import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCarComponent } from './add-car/add-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarRoutingModule } from './car-routing.module';
import { CarService } from './car.service';

@NgModule({
  declarations: [AddCarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarRoutingModule,
    FormsModule
  ],
  providers: [
    CarService
  ]
})
export class CarModule { }

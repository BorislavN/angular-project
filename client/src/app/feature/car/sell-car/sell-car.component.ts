import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICar } from 'src/app/shared/interface/car-details';
import { CarService } from '../car.service';

@Component({
  selector: 'app-sell-car',
  templateUrl: './sell-car.component.html',
  styleUrls: ['./sell-car.component.css']
})
export class SellCarComponent {
  @Input("currentCar") currentCar: ICar;
  @Output() onCloseSellForm = new EventEmitter<boolean>();
  formLoading: boolean;
  form: FormGroup;

  constructor(private carService: CarService, private builder: FormBuilder, private router: Router) {
    this.formLoading = false;

    this.form = this.builder.group({
      price: ["", [Validators.required, Validators.min(100), Validators.max(5000000)]],
      description: ["", [Validators.maxLength(750)]]
    });
  };

  submitFormHandler(): void {
    this.formLoading = true;

    this.carService.sellCar({ carId: this.currentCar._id, ...this.form.value }).subscribe({
      next: (result) => {
        this.formLoading = false;
        this.router.navigateByUrl("user/offers");
      },
      error: (err) => {
        this.router.navigate(['/error'], { queryParams: { error: (err?.error?.message || err.message) } })
      }
    });
  };

  closeForm(): void {
    this.onCloseSellForm.emit(true);
  };
}
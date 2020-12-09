import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ICar } from 'src/app/shared/interface/car-details';
import { parseUrl } from 'src/app/shared/util/url.parser';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  isLoading: boolean;
  inForm: boolean;
  formLoading: boolean;
  currentCar: ICar;
  imgUrl: String;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private carService: CarService, private builder: FormBuilder, private titleService : Title) {
    this.isLoading = true;
    this.formLoading = false;
    this.inForm = false;

    this.form = this.builder.group({
      price: ["", [Validators.required, Validators.min(100), Validators.max(5000000)]],
      description: ["", [Validators.maxLength(750)]]
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Car Details");
    const carId = this.route.snapshot.params['id'];

    this.carService.getCar(carId).subscribe({
      next: (result) => {
        this.imgUrl = parseUrl(result.pictures[0]);
        this.currentCar = result;
        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigate(['/error'], { queryParams: { error: err.error.message } })
      }
    })
  }

  toggleForm() {
    this.inForm = !(this.inForm);
  }

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
  }
}
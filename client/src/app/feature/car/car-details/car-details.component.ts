import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  isDeleting: boolean;
  inSellForm: boolean;
  inEditForm: boolean;
  currentCar: ICar;
  imgUrl: String;

  constructor(private route: ActivatedRoute, private router: Router, private carService: CarService, private titleService: Title) {
    this.isLoading = true;
    this.isDeleting = false;
    this.inEditForm = false;
    this.inSellForm = false;
  };

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
    });
  };

  toggleSellForm() {
    this.inSellForm = !(this.inSellForm);
  };

  deleteHandler(): void {
    this.isDeleting = true;

    this.carService.deleteCar(this.currentCar._id).subscribe({
      next: (result) => {
        this.router.navigate(['/collection']);
      },
      error: (err) => {
        this.router.navigate(['/error'], { queryParams: { error: err.error.message } });
      }
    });
  };

  toggleEditForm(): void {
    this.inEditForm = !(this.inEditForm);
    if (!this.inEditForm) {
      this.titleService.setTitle("Car Details");
    }
  };

  saveEdited(data: ICar): void {
    this.currentCar = data;
    this.imgUrl = parseUrl(this.currentCar.pictures[0]);
    this.titleService.setTitle("Car Details");
    this.inEditForm = false;
  };
}
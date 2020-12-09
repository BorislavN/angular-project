import { Component, OnInit } from '@angular/core';
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
  currentCar:ICar;
  imgUrl:String;

  constructor(private route: ActivatedRoute, private router: Router, private carService: CarService) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    const carId = this.route.snapshot.params['id'];

    this.carService.getCar(carId).subscribe({
      next: (result) => {
        this.imgUrl=parseUrl(result.pictures[0]);
        this.currentCar = result;
        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigateByUrl("/error", { queryParams: { error: err.error.message } })
      }
    })
  }
}
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ICarCard } from 'src/app/shared/interface/car-card';
import { CarService } from '../car.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collection: ICarCard[];
  isLoading: boolean;

  constructor(private carService: CarService, private titleService: Title, private router: Router) {
    this.collection = [];
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.titleService.setTitle("Collection");

    this.carService.getMyCollection().subscribe({
      next: (result) => {
        this.collection = result;
        this.isLoading = false;
      },
      error: (err) => {
        this.router.navigateByUrl("/error", { queryParams: { error: err.error.message } })
      }
    })
  }
}

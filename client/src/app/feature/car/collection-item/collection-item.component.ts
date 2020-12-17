import { Component, Input, OnInit } from '@angular/core';
import { ICarCard } from 'src/app/shared/interface/car-card';
import { parseUrl } from 'src/app/shared/util/url.parser';

@Component({
  selector: 'app-collection-item',
  templateUrl: './collection-item.component.html',
  styleUrls: ['./collection-item.component.css']
})

export class CollectionItemComponent implements OnInit {

  @Input('car') car: ICarCard;
  make: String;
  model: String;
  id: String;
  url: String;
  forSale: boolean;

  constructor() { }

  ngOnInit(): void {
    this.make = this.car.make;
    this.model = this.car.model;
    this.id = this.car._id;
    this.url = parseUrl(this.car.pictures[0]);
    this.forSale = this.car.forSale;
  }
}

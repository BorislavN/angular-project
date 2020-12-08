import { Component, Input, OnInit } from '@angular/core';
import { ICarCard } from 'src/app/shared/interface/car-card';

const cloudUrl = "https://res.cloudinary.com/dqll1uvhe/image/upload/";

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
    let imgName = ((this.car.pictures[0]).url.split(cloudUrl)[1]).split("/")[1];
    this.url = `${cloudUrl}q_40/${imgName}`;
    this.forSale = this.car.forSale;
  }
}
